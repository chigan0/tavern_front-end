function homepage(){
 let body = document.querySelector('body');
         let numberOfSlides = document.querySelectorAll('.review').length;

         let mainBlock = document.querySelector('.main');
         let elems =[
            firstBlock = document.querySelector('.first-block'),
            aboutBlock = document.querySelector('.about'),
            advantagesBlock = document.querySelector('.advantages'),
            howWeWorkBlock = document.querySelector('.how-we-work'),
            reviewsBlock = document.querySelector('.reviews'),
            
         ];
         
         let numbers = document.querySelectorAll('.aside-content__number'),
             numbersBlock = document.querySelector('.aside-content'),
             params = [],
             numbersBottoms = [];
         numbers.forEach(item => {
            numbersBottoms.push(item.getBoundingClientRect().top + item.getBoundingClientRect().height);
         });
         // console.log(numbersParams);
         elems.forEach(item => {
            params.push({
               top:  item.getBoundingClientRect().top - body.getBoundingClientRect().top,
               height: item.getBoundingClientRect().height,
            });
            
         });
         let center = document.documentElement.clientHeight / 2 + window.pageYOffset + 100;
            for (let i = 0; i < params.length; i++) {
               let circle = numbers[i].querySelector('.progress-ring__circle'),
                   radius = circle.r.baseVal.value,
                   circumference = radius * 2 * Math.PI;

               circle.style.strokeDasharray = `${circumference} ${circumference}`;
               circle.style.strokeDashoffset = `${circumference }`;

               function setProgress(percent, c, circlref) {
                  const offset = circlref - percent / 100 * circlref;
                  c.style.strokeDashoffset = offset ;
               }
               if(center >= params[i].top && center <= params[i].height + params[i].top){
                  setProgress((100 / params.length * (i + 1)), circle, circumference);
                  numbers[i].classList.add('active');
               } else {
                  numbers[i].classList.remove('active');
                  setProgress(0, circle, circumference);
               }

            }
            for (let i = 0; i < numbersBottoms.length; i++) {
               if (mainBlock.getBoundingClientRect().top + 150 < numbersBottoms[i] && mainBlock.getBoundingClientRect().top + mainBlock.getBoundingClientRect().height - 150 > numbersBottoms[i]){
                  
                  numbers[i].style.color = `#000`;
                  if(numbers[i].classList.contains('active')) {
                     numbers[i].style.border = `1px solid rgba(39, 24, 18, 0.4)`;
                  } else {
                     numbers[i].style.border = null;

                  }
                  numbers[i].querySelector('circle').style.stroke = 'black';
               } else {
                  numbers[i].style.color = `#fff`;
                  numbers[i].style.border = null;

                  numbers[i].querySelector('circle').style.stroke = 'white';

               }        
            }
         addEventListener("scroll", ()=> {
            for (let i = 0; i < numbersBottoms.length; i++) {
               if (mainBlock.getBoundingClientRect().top + 150 < numbersBottoms[i] && mainBlock.getBoundingClientRect().top + mainBlock.getBoundingClientRect().height - 150 > numbersBottoms[i]){
                  
                  numbers[i].style.color = `#000`;
                  if(numbers[i].classList.contains('active')) {
                     numbers[i].style.border = `1px solid rgba(39, 24, 18, 0.4)`;
                  } else {
                     numbers[i].style.border = null;

                  }
                  numbers[i].querySelector('circle').style.stroke = 'black';
               } else {
                  numbers[i].style.color = `#fff`;
                  numbers[i].style.border = null;

                  numbers[i].querySelector('circle').style.stroke = 'white';

               }        
            }
            
            let center = document.documentElement.clientHeight / 2 + window.pageYOffset + 100;
            for (let i = 0; i < params.length; i++) {
               let circle = numbers[i].querySelector('.progress-ring__circle'),
                   radius = circle.r.baseVal.value,
                   circumference = radius * 2 * Math.PI;

               circle.style.strokeDasharray = `${circumference} ${circumference}`;
               circle.style.strokeDashoffset = `${circumference }`;

               function setProgress(percent, c, circlref) {
                  const offset = circlref - percent / 100 * circlref;
                  c.style.strokeDashoffset = offset ;
               }
               if(center >= params[i].top && center <= params[i].height + params[i].top){
                  setProgress((100 / params.length * (i + 1)), circle, circumference);
                  numbers[i].classList.add('active');
               } else {
                  numbers[i].classList.remove('active');
                  setProgress(0, circle, circumference);
               }

            }
            
         });
}
