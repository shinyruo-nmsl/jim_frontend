import {
  Form,
  Input,
  Button,
  Popup,
  Space,
  Tag,
  Empty,
  Card,
} from "antd-mobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Poetry } from "proj-service";
import { useState } from "react";
import { WebApi } from "web-common";

import "swiper/css";

const {
  Poetry: { fetchGetPoetriesByAuthorAndKeyWords },
} = WebApi;

function PoetryPage() {
  const {
    query,
    changeQuery,
    limit,
    pageNo,
    hasMore,
    poetryPagination,
    search,
    changePage,
  } = Poetry.usePoetry(fetchGetPoetriesByAuthorAndKeyWords);

  const [searchPopupVisible, setSearchPopupVisible] = useState(false);

  const isEmpty = !poetryPagination.data.length;

  const [slidesData, setSlidesData] = useState<Poetry.PoetryData[][]>([[]]);

  const handleSerach = async () => {
    setSearchPopupVisible(false);
    try {
      const data = await search();
      if (data.total > limit) {
        setSlidesData([data.data, []]);
      } else {
        setSlidesData([data.data]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSlideChange = async (e: { activeIndex: number }) => {
    if (hasMore && e.activeIndex === slidesData.length - 1) {
      const data = await changePage(pageNo + 1, limit);
      if (data.total > (pageNo + 1) * limit + data.data.length) {
        setSlidesData((prev) => [
          ...prev.slice(0, prev.length - 1),
          data.data,
          [],
        ]);
      } else {
        setSlidesData((prev) => [...prev.slice(0, prev.length - 1), data.data]);
      }
    }
  };

  const SearchBtn = (
    <Button
      color="primary"
      className="flex-none"
      onClick={() => setSearchPopupVisible(true)}
    >
      search
    </Button>
  );

  return (
    <div className="h-full flex flex-col">
      {!isEmpty && (
        <div className="flex-none flex justify-between items-center p-12">
          <Space className="flex-auto flex flex-wrap gap-4">
            {query.author && <Tag color="#108ee9">{query.author}</Tag>}
            {query.keyword1 && <Tag color="#108ee9">{query.keyword1}</Tag>}
            {query.keyword2 && <Tag color="#108ee9">{query.keyword2}</Tag>}
          </Space>
          {SearchBtn}
        </div>
      )}

      <div className="flex-auto flex-col overflow-auto relative">
        {isEmpty && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Empty
              description="no data"
              imageStyle={{
                height: 60,
              }}
            />
            {SearchBtn}
          </div>
        )}
        {!isEmpty && (
          <>
            <Swiper
              className="h-[80%] "
              initialSlide={0}
              spaceBetween={10}
              onSlideChange={handleSlideChange}
            >
              {slidesData.map((slideData, index) => (
                <SwiperSlide className="overflow-auto" key={index}>
                  {slideData.map((item) => (
                    <div key={item.id} className="w-full flex flex-col">
                      <div key={item.id} className="w-full">
                        <Card className="flex-none" title="标题">
                          {item.title}
                        </Card>
                        <Card className="flex-none" title="作者">
                          {item.author}
                        </Card>
                        <Card title="内容">{item.content}</Card>
                      </div>
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>

      <Popup
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
          background: "#fafbfc",
        }}
        showCloseButton
        visible={searchPopupVisible}
        onClose={() => setSearchPopupVisible(false)}
      >
        <h1 className="text-center text-24 font-bold pt-10">search</h1>
        <Form
          className="pt-10"
          layout="horizontal"
          mode="card"
          footer={
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              onClick={handleSerach}
            >
              confirm
            </Button>
          }
        >
          <Form.Item label="作者">
            <Input
              placeholder="请输入作者"
              value={query.author}
              onChange={(e) => changeQuery("author", e)}
            />
          </Form.Item>
          <Form.Item label="关键词1">
            <Input
              placeholder="请输入关键词1"
              value={query.keyword1}
              onChange={(e) => changeQuery("keyword1", e)}
            />
          </Form.Item>
          <Form.Item label="关键词2">
            <Input
              placeholder="请输入关键词2"
              value={query.keyword2}
              onChange={(e) => changeQuery("keyword2", e)}
            />
          </Form.Item>
        </Form>
      </Popup>
    </div>
  );
}

export default PoetryPage;
