import React, {useState ,useEffect, useRef,useCallback } from 'react';
import './SliderBuilder.scss';

import {Box, Truck, B2b} from '../../assets/image';
import Slider from '../../components/Slider/Slider';
import Dots from '../../components/UI/Dots/Dots';

const SliderBuilder = () => {
   const [slider, setSlider] = useState({
      sliderData: [
         {
         id: 'slide-1',
         heading: 'Курьерская доставка',
         text: ' в любой населённый пункт СНГ и дальнего зарубежья',
         img: Box
      },
      {
         id: 'slide-2',
         heading: 'от двери до двери',
         text: 'полный комплекс услуг по доставке почтовых и грузовых отправлений',
         img: B2b
      },
      {
         id: 'slide-3',
         heading: 'Скорость и качество',
         text: 'соответствуют самым высоким требованиям',
         img: Truck
      }, 
    ],
      currentSlideData: {
         currentSlide: 0, 
         transition: true
      },
      widthData: {
         width: '',
         fillPercent: '50'
      },
      dotsData: {
         dotsCount: [1,2,3], 
         dotStatus: {0: true}
      },
      position: 0,
   });
   const [swiper, setSwiper] = useState({
      isDown: false,
      startX: '',
      scrollLeft: ''
   });
   const sliderWidth = useRef(null);
   const sliderRef = useRef();

   // Меняем слайды по клику на Доты
   const handleSlideChange = useCallback(arg => {
      // console.log(arg);
      let position = 0;
      let currrentSlide = arg;
      let dotStatus = {};
      switch(true) {
         case(slider.currentSlideData.currentSlide === 2 && currrentSlide === 0):
            dotStatus[arg] = true;
            currrentSlide = 3;
            position = -slider.widthData.width * 3;
            break;
         case(slider.dotsData.dotsCount[arg] !== undefined ):
            dotStatus[arg] = true;
            position = -slider.widthData.width * arg;
            break;
         default:
            dotStatus[arg] = true;
            position = 0;
      }

      setSlider(prevState => ({
            ...prevState,
            position: position,
            currentSlideData: {
               transition: true,
               currentSlide: currrentSlide
            },
            dotsData: {
               ...prevState.dotsData, 
               dotStatus: dotStatus
            }   
         })
      );
   }, [slider]);

   // Обнуляем transition после того как покажется последний слайд
   const updateTransiotionHandler = useCallback(() => {
      if (slider.currentSlideData.currentSlide === sliderWidth.current.children.length-1 ) {
         setSlider(prevState => ({
            ...prevState,
            currentSlideData: {
               currentSlide: 0,
               transition: false
            },
            position: 0
         }));
      }
   }, [slider.currentSlideData.currentSlide]); 
  
   const handleMouseDown = e => {
      // console.log(e.touches[0]);
      let { left }  = sliderWidth.current.getBoundingClientRect();
      let scrollLeft = sliderWidth.current.scrollLeft;
      let startX = e.touches[0].clientX - left;

      setSwiper(prevState => ({
         ...prevState,
         isDown:true,
         startX: startX,
         scrollLeft: scrollLeft
      }));
   };

   const handleMouseUp = e => {
      // console.log(e.target.id);
      let slideId = e.target.closest('.SliderImage').id.split('-')[1];
      handleSlideChange(slideId);

      setSwiper(prevState => ({
         ...prevState,
         isDown: false
      }));
   };  

   const handleMouseLeave = () => {
      console.log('leave');
      setSwiper(prevState => ({
         ...prevState,
         isDown: false
      }));
   };

   const handleMouseMove = e => {
      if (!swiper.isDown) return;
      let { left }  = sliderRef.current.getBoundingClientRect();
      let x = e.touches[0].clientX - left;
      
   };   

   // Узнаем ширину бокса в котором показываются слайды
   useEffect(() => {       
      if (sliderWidth.current.offsetWidth < 700) {
         setSlider(prevState => ({
            ...prevState,
            widthData: {
               width: sliderWidth.current.offsetWidth, 
               fillPercent: '100'
            }
         }));
      } else {
         setSlider(prevState => ({
            ...prevState,
            widthData: {
               width: sliderWidth.current.offsetWidth, 
               fillPercent: '50'
            }
         }));
      }
   }, []);
   
   // Рендерим слайды
   const allslids = slider.sliderData.map(slide => (
      <Slider 
         key={slide.id} 
         bgimage={slide.img} 
         heading={slide.heading} 
         text={slide.text}
         id={slide.id} 
         percent={slider.widthData.fillPercent}/>
      )
   );
   
   return (
      <div className="Container">
         <div className="Slider" 
            ref={sliderRef} 
         >
            <div className='Slider-Box'
               onTransitionEnd={updateTransiotionHandler} 
               ref={sliderWidth} 
               style={{transform: `translateX(${slider.position}px)`, transition: slider.currentSlideData.transition ? "transform 1s" : "none" }}
               onTouchStart={handleMouseDown}
               onTouchEnd={event => handleMouseUp(event)}
               onTouchCancel ={handleMouseLeave}
               onTouchMove ={event => handleMouseMove(event)}
            >
               {allslids}
               <Slider 
                  key='clone-slide'
                  bgimage={slider.sliderData[0].img}
                  heading={slider.sliderData[0].heading} 
                  text={slider.sliderData[0].text}
                  percent={slider.widthData.fillPercent}
                  id={'slide-4'}
               />
            </div>
               <Dots 
                  active={slider.dotsData.dotStatus} 
                  dots={slider.dotsData.dotsCount.length} 
                  changeSlide={(arg) => handleSlideChange(arg)}
               />
         </div>
      </div>
   );
};

export default SliderBuilder;