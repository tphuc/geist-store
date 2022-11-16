import { sand } from '@radix-ui/colors';
import React from 'react';




const data = [
    {
        url: "/wallet1.png"
    },
    {
        url: "/wallet1.png"
    },
    {
        url: "/wallet1.png"
    },
]



export default function ImageCarousel({
    style,
    images = data,
}) {


    const [activeImg, setActiveImg] = React.useState(0);
    const sliderContainerRef = React.useRef(null)

    const scrollToImage = (index) => {

        sliderContainerRef.current.scroll({
            left: index * sliderContainerRef.current.clientWidth
        })
        setActiveImg(index)
    }

    const handleScroll = (e) => {
        var activeIndex = Math.round(sliderContainerRef.current.scrollLeft / sliderContainerRef.current.clientWidth)
        if (activeIndex != activeImg) {
            setActiveImg(activeIndex)
        }
    }

    return <div style={{ position: "relative", display:"flex", boxSizing:"border-box",boxShadow:"0px 0px 0px 1px #111", ...style }}>
        <style jsx>{`
        .carousel {

            overflow-x: auto;
          white-space: nowrap;
          display: flex;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          box-sizing:border-box;
        
          width: 100%;
        }
        
        ::-webkit-scrollbar {
            width: 0px;
            height: 0px
        }
        
        .carousel-item {
            min-width: 100%;
          min-height: 100%;
          scroll-snap-align: center;
        }
        
        `}

        </style>
        <div ref={sliderContainerRef}onScroll={(e) => handleScroll(e)} className="carousel" >
            {
                images?.map((item, id) => <div key={id} className='carousel-item' >
                    <img style={{ width:"100%", minWidth:300, minHeight:300 }}  src={item.url} />
                </div>)
            }
        </div>
        {/* <Divider /> */}
        <div style={{ display: "flex", position: "absolute", bottom:-1, left:-1, maxWidth: '100%', flexDirection: "row", border:"1px solid #888", background:sand.sand1 }}>
            {
                images?.map((item, id) => <div onClick={() => scrollToImage(id)} style={{ cursor: "pointer", width:40, height:40, margin:-1,  border: activeImg == id ? `1px solid #111` : '1px solid transparent', }} key={id} >
                    <img style={{   width:"100%", height:"100%", objectPosition: 'center center', objectFit: "cover" }} src={item.url} />
                </div>)
            }
        </div>
        {/* <Divider /> */}
       
    </div>
}

