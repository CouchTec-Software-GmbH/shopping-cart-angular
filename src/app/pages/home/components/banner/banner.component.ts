import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule],
  template: `
<div
    class="flex flex-col w-full h-full bg-white border-b border-b-black border-b-solid ">
<div
    class="absolute w-full h-[71%] shrink-0 bg-white bg-[url('assets/images/Rectangle.png')] bg-lightgray bg-no-repeat bg-cover bg-bottom">
    </div>

    <header
        class="flex flex-row w-full justify-between items-center pt-[25.5px] pl-[131px] pr-[145px] text-white text-xl font-semibold mix-blend-luminosity">
        <div
            class="flex  w-[185px]  relative items-center justify-center">
            <p
                class="flex -mt-1 text-[27px] shrink-0 w-full h-full item-center justify-center text-white text-center [text-stroke-width:0.3px] [text-stroke-color:#FFF] text-[40.5px] font-extrabold 
          ">
                couchtec
            </p>
        </div>
        <div
            class="flex flex-row justify-between items-center gap-[21px] inline-flex text-[22.5px] font-bold">
            <div class="flex w-[155px] h-[66px] justify-center items-center">
                <p>Lösungen</p>
            </div>
            <div class="flex w-[155px] h-[66px] justify-center items-center">
                <p>So Geht's</p>
            </div>
            <div class="flex w-[155px] h-[66px] justify-center items-center">
                <p>Über uns</p>
            </div>
            <div class="flex w-[155px] h-[66px] justify-center items-center">
                <p>Kontakt</p>
            </div>
        </div>
        <button
            class="flex flex-row inline-flex items-center gap-[15px] mt-[3px] px-[29.5px] h-[49.5px] rounded-[150px] bg-[rgba(255,255,255,0.24)]
        ">
            <p class="text-[22.5px] text-medium">Anmelden</p>
            <svg width="10" height="15" viewBox="0 0 10 15" fill="none"
                class="mt-1"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.93934 7.74987L0 2.81053L2.12132 0.689209L9.18198 7.74987L2.12132 14.8105L0 12.6892L4.93934 7.74987Z"
                    fill="white" />
            </svg>
        </button>
    </header>
    <div class="flex flex-col ml-[115px]">
        <div
            class="flex flex-col mt-[6%] text-dark text-[100.5px] font-bold tracking-tighter mix-blend-luminosity w-[869px]">
            <p>Maßgeschneiderte Webentwicklung</p>
            <p>für Ihr Unternehmen</p>
        </div>
        <p
            class="flex w-[503px]  mt-[31px] text-[#425466] font-normal text-[27px]">Entwerfen
            Sie
            Ihre
            Webanwendung mit Leichtigkeit und
            überlassen
            Sie uns
            die Entwicklung - genau nach Ihren Vorgaben.</p>
        <div class="flex inline-flex items-center mt-[60px] gap-[6px] ">
            <button
                class="flex h-[49.5px] px-[19.5px] items-center gap-[13px] rounded-[150px] bg-[#11253E]">
                <p
                    class="flex flex-col justify-center w-[102px] h-[45px] text-white text-[22.5px] font-medium text-center tracking-[0.15px]">Starten</p>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none"
                    class="mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.93934 7.74999L0 2.81065L2.12132 0.689331L9.18198 7.74999L2.12132 14.8107L0 12.6893L4.93934 7.74999Z"
                        fill="white" />
                </svg>
            </button>
            <button class="flex h-[33px] px-[13px] items-center gap-2">
                <p
                    class="text-[#0A2540] text-center text-[22.5px] font-medium tracking-[0.15px]
        ">Kontakt</p>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none"
                    class="mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.12147 7.74999L0.182129 2.81065L2.30345 0.689331L9.36411 7.74999L2.30345 14.8107L0.182129 12.6893L5.12147 7.74999Z"
                        fill="#0A2540" />
                </svg>

            </button>

        </div>
 <div class="absolute left-[60%] top-[18%] w-[40%] h-[82%]">
        <div
            class="absolute left-[0px] top-[79px] bg-white linus h-[730px] z-10 rounded-[41px] bg-white shadow-[9px_0px_36px_0px_rgba(0,0,0,0.12),0px_24px_48px_0px_rgba(17,37,62,0.16)] shrink-0"></div>
        <div
            class="absolute left-[127px] top-[0px] w-[1210px] h-[732px] rounded-[16px] shadow-[0px_34px_36px_0px_rgba(17,37,62,0.16)] backdrop-blur-[10px] shrink-0 bg-gradient-to-bl from-[#E7E8ED] to-[#FFFFFF] opacity-50">
        </div>

        <div
            class="absolute w-[587px] h-[27.4px] bg-white shrink-0 z-5 left-[327px] top-[29px] rounded-[6px] bg-white shadow-[6px_6px_12px_0px_rgba(0,0,0,0.08)]">
        </div>

        <div
            class="absolute w-[951px] h-[300px] bg-white shrink-0 z-5 left-[400px] top-[79px] rounded-[6px] bg-white shadow-[6px_6px_12px_0px_rgba(0,0,0,0.08)]">
        </div>

        <div
            class="absolute w-[951px] h-[287px] bg-white shrink-0 z-5 left-[400px] top-[412px] rounded-[6px] bg-white shadow-[6px_6px_12px_0px_rgba(0,0,0,0.08)]">
        </div>
        </div>       
    </div>

</div>
     `,
})
export class BannerComponent {
}
