风险点：1.当客户端没有缓存时，【客户端没有缓存】->【用户未提交过订单】不一定成立，因为涉及H5/PC/APP三端应用，如果用户在APP里面提交过，web端是感知不到的。可能带来的问题：
1.1 如果用户没有订阅，此时按照流程，客户端会展示【未勾选】，而原本预期是【不展示】，不过影响不大
1.2 如果用户订阅，此时按照流程，客户端会展示【未勾选】，而用户的预期是【勾选】，是否会带来客诉2.客户端应该如何缓存用户上次的状态：
2.1 如果用户没登录，那只能根据设备来缓存，如果用户换了设备，则默认为【用户未提交过订单】，但是这种情况下如果调整为服务端缓存的策略，服务端也只能根据clientID去保存，效果与客户端保存相当
2.2 如果用户登录了，则根据UID进行缓存，可能存在的问题点是目前融合项目中，用户的唯一标识是存在cookie中的，并且可能经过服务端加密不确定是否能正常decode获取UID，并且一些浏览器在严格模式下可能会禁止使用JavaScript获取cookie，所以结论是不确定是否能正常获取UID根据用户去缓存
3.PC/H5两端是否应该相互隔离：
我觉得不应该，因为订阅本身是用户的行为，应该因为用户的行为发生变化，与具体的平台无关，如果用户在H5甚至APP中选择了订阅邮箱，下次在PC中还让用户选择订阅可能并不合理4.边缘情况下，用户可能会手动清掉客户端缓存，不过这种行为实际是用户本身的选择，应对相关行为负责，个人觉得可以不考虑。