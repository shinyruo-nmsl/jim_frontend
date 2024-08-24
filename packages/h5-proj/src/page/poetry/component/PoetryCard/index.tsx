import { Poetry } from 'proj-service'


type PoetryCardProps = Exclude<Poetry.PoetryData, 'id'> & Poetry.AuthorAndKeyWordsQuery

function PoetryCard({ title, author, content, keyword1, keyword2 }: PoetryCardProps) {


    const getSplitContent = () => {
        const parghs = content.split('。').filter(Boolean)
        return parghs.reduce((acc: string[][], graph) => {
            const chunks = Poetry.splitPoetryContentByKeyWords(graph, keyword1, keyword2)
            const _gragh = chunks.reduce((total: string[][], chunk) => {
                if (chunk.includes('，')) {
                    const strs = chunk.split('，')
                    if (total.length) {
                        const last = total[total.length - 1]
                        last.push(`${strs[0]}，`)
                        return [...total, ...strs.slice(1).map((s, index) => index === strs.length - 2 ? [s] : [`${s}，`])]
                    } else {
                        return [...strs.map((s, index) => index === strs.length - 1 ? [s] : [`${s}，`])]
                    }
                } else {
                    if (total.length) {
                        total[total.length - 1].push(chunk)
                        return total
                    } else {
                        return [...total, [chunk]]
                    }
                }


            }, [])
            if (_gragh.length > 0) {
                return acc.concat([..._gragh.slice(0, _gragh.length - 1), [..._gragh[_gragh.length - 1], '。']])
            }
            return acc

        }, [])
    }

    const shownContent = getSplitContent()



    return <div className='flex flex-col items-center'>
        <h3>{title}</h3>
        <h5>{author}</h5>

        <div>

            {
                shownContent.map((segment, index) => < div key={index}>
                    {
                        segment.map((chunk, index) => <span key={index}>{chunk}</span>)
                    }
                </div>)
            }

        </div>

    </div>

}


export default PoetryCard