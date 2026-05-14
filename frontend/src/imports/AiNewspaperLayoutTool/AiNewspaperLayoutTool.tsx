import svgPaths from "./svg-8so90zj1eq";
import imgImageWithFallback from "./d26ca52de2367074d92df87935f9662d81f8e855.png";
import { imgGroup } from "./svg-o6puj";

function ImageWithFallback() {
  return (
    <div className="h-[32px] relative shrink-0 w-[58.625px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[64px] relative shrink-0 w-[255.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[0.8px] px-[24px] relative size-full">
        <ImageWithFallback />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[13px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3c193bc0} id="Vector" stroke="var(--stroke-0, #FCFAF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13.5 12.75V6.75" id="Vector_2" stroke="var(--stroke-0, #FCFAF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9.75 12.75V3.75" id="Vector_3" stroke="var(--stroke-0, #FCFAF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6 12.75V10.5" id="Vector_4" stroke="var(--stroke-0, #FCFAF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#23384f] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] h-[44px] relative rounded-[14px] shrink-0 w-full" data-name="Link">
      <Icon />
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[24px] left-[42px] not-italic text-[#fcfaf6] text-[16px] top-[9.6px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[13px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2f7c3ff0} id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p772e900} id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p99ad200} id="Vector_3" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p3fc0d440} id="Vector_4" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[44px] relative rounded-[14px] shrink-0 w-full" data-name="Link">
      <Icon1 />
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[24px] left-[42px] not-italic text-[16px] text-[rgba(35,56,79,0.6)] top-[9.6px] whitespace-nowrap">Workspace</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[13px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pd2eb480} id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p19685c00} id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p226d9800} id="Vector_3" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d={svgPaths.p2a5062c0} id="Vector_4" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[44px] relative rounded-[14px] shrink-0 w-full" data-name="Link">
      <Icon2 />
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[24px] left-[42px] not-italic text-[16px] text-[rgba(35,56,79,0.6)] top-[9.6px] whitespace-nowrap">Pengguna</p>
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[588.8_0_0] min-h-px relative w-[255.2px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start pt-[24px] px-[16px] relative size-full">
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[13px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3d8d0000} id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d="M12 12.75L15.75 9L12 5.25" id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
          <path d="M15.75 9H6.75" id="Vector_3" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[44px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Icon3 />
      <p className="-translate-x-1/2 absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[24px] left-[66px] not-italic text-[16px] text-[rgba(35,56,79,0.6)] text-center top-[9.6px] whitespace-nowrap">Keluar</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[76.8px] relative shrink-0 w-[255.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16.8px] px-[16px] relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#fcfaf6] drop-shadow-[4px_0px_12px_rgba(35,56,79,0.02)] h-[729.6px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-r-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[0.8px] relative size-full">
        <Container />
        <Navigation />
        <Container1 />
      </div>
    </div>
  );
}

function Container3() {
  return <div className="h-0 relative shrink-0 w-[1031.037px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return <div className="absolute bg-[#fb64b6] border-[0.8px] border-solid border-white left-[22px] rounded-[26843500px] size-[8px] top-[6px]" data-name="Text" />;
}

function Button1() {
  return (
    <div className="absolute left-0 size-[36px] top-0" data-name="Button">
      <Icon4 />
      <Text />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[#f1efe9] h-[32px] left-[56px] top-[2px] w-px" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] leading-[14px] left-[91px] not-italic text-[#23384f] text-[14px] text-right top-[-0.4px] whitespace-nowrap">Admin Utama</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize flex-[1_0_0] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[16px] min-w-px relative text-[12px] text-[rgba(35,56,79,0.6)] text-right">admin</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[33.987px] items-start left-[77px] top-px w-[90.363px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0 w-[167.363px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button1 />
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="bg-[#fcfaf6] drop-shadow-[0px_4px_12px_rgba(35,56,79,0.02)] h-[64px] relative shrink-0 w-[1278.4px]" data-name="TopNav">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.8px] px-[40px] relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] min-w-px relative text-[#23384f] text-[24px]">Dasbor Analitik</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Ringkasan performa sistem dan metrik pengguna.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[55.987px] items-start left-0 top-0 w-[326.825px]" data-name="Container">
      <Heading />
      <Paragraph2 />
    </div>
  );
}

function Option() {
  return <div className="relative shrink-0 size-0" data-name="Option" />;
}

function Option1() {
  return <div className="relative shrink-0 size-0" data-name="Option" />;
}

function Option2() {
  return <div className="relative shrink-0 size-0" data-name="Option" />;
}

function Option3() {
  return <div className="relative shrink-0 size-0" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_2px_5px_rgba(35,56,79,0.02)] flex h-[38px] items-center left-0 pl-[-1331.2px] pr-[32.8px] py-[8.8px] rounded-[14px] top-0 w-[148px]" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[122px] size-[14px] top-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[38px] left-[1035.2px] top-[17.99px] w-[148px]" data-name="Container">
      <Dropdown />
      <Icon5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Total Unggah</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] min-w-px relative text-[#23384f] text-[24px] tracking-[-0.6px]">1,248</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-[87.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] flex gap-[20px] h-[105.6px] items-center left-0 p-[24.8px] rounded-[24px] top-0 w-[277.8px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p223b2500} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M21 3V8H16" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p1f4a200} id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M8 16H3V21" id="Vector_4" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Sedang Diproses</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] min-w-px relative text-[#23384f] text-[24px] tracking-[-0.6px]">12</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-[114.85px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function StatCard1() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] flex gap-[20px] h-[105.6px] items-center left-[301.8px] p-[24.8px] rounded-[24px] top-0 w-[277.8px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_43_341)" id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
        <defs>
          <clipPath id="clip0_43_341">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Selesai</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#23384f] text-[24px] tracking-[-0.6px] whitespace-nowrap">1,150</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-[55.825px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function StatCard2() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] flex gap-[20px] h-[105.6px] items-center left-[603.6px] p-[24.8px] rounded-[24px] top-0 w-[277.8px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p161d4800} id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p13e20900} id="Vector_4" stroke="var(--stroke-0, #23384F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#f1efe9] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Pengguna Terdaftar</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] min-w-px relative text-[#23384f] text-[24px] tracking-[-0.6px]">48</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-[132px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function StatCard3() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] flex gap-[20px] h-[105.6px] items-center left-[905.4px] p-[24.8px] rounded-[24px] top-0 w-[277.8px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[105.6px] relative shrink-0 w-full" data-name="Container">
      <StatCard />
      <StatCard1 />
      <StatCard2 />
      <StatCard3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#23384f] text-[18px] top-[0.4px] whitespace-nowrap">Tren Unggahan</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Jumlah dokumen yang diunggah minggu ini</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph11 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[94.62%_93.02%_0.17%_3.97%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_93.02%_0.17%_3.97%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Sen</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[94.62%_77.77%_0.17%_19.77%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_77.77%_0.17%_19.77%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Sel</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[94.62%_61.97%_0.17%_35.02%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_61.97%_0.17%_35.02%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Rab</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[94.62%_46.17%_0.17%_50.27%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_46.17%_0.17%_50.27%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Kam</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[94.62%_30.78%_0.17%_65.94%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_30.78%_0.17%_65.94%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Jum</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[94.62%_15.39%_0.17%_81.6%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_15.39%_0.17%_81.6%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Sab</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[94.62%_-0.07%_0.17%_97.2%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[94.62%_-0.07%_0.17%_97.2%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-center whitespace-nowrap">Min</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[94.62%_-0.07%_0.17%_3.97%]" data-name="Group">
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[94.62%_-0.07%_0.17%_3.97%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[86.9%_95.62%_7.9%_3.28%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[86.9%_95.62%_7.9%_3.28%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-right whitespace-nowrap">0</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[65.37%_95.62%_29.42%_3.28%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[65.37%_95.62%_29.42%_3.28%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-right whitespace-nowrap">8</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[43.84%_95.62%_50.95%_2.46%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[43.84%_95.62%_50.95%_2.46%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-right whitespace-nowrap">16</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[22.31%_95.62%_72.48%_2.33%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[22.31%_95.62%_72.48%_2.33%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-right whitespace-nowrap">24</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[0.78%_95.62%_94.01%_2.33%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.78%_95.62%_94.01%_2.33%] leading-[normal] not-italic text-[12px] text-[rgba(35,56,79,0.4)] text-right whitespace-nowrap">32</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[0.78%_95.62%_7.9%_2.33%]" data-name="Group">
      <Group11 />
      <Group12 />
      <Group13 />
      <Group14 />
      <Group15 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[0.78%_95.62%_7.9%_2.33%]" data-name="Group">
      <Group10 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[3.47%_1.37%_10.42%_5.47%]" data-name="Group">
      <div className="absolute inset-[-0.2%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 681 249">
          <g id="Group">
            <path d="M0 248.5H681" id="Vector" stroke="var(--stroke-0, #F1EFE9)" strokeDasharray="3 3" />
            <path d="M0 186.5H681" id="Vector_2" stroke="var(--stroke-0, #F1EFE9)" strokeDasharray="3 3" />
            <path d="M0 124.5H681" id="Vector_3" stroke="var(--stroke-0, #F1EFE9)" strokeDasharray="3 3" />
            <path d="M0 62.5H681" id="Vector_4" stroke="var(--stroke-0, #F1EFE9)" strokeDasharray="3 3" />
            <path d="M0 0.5H681" id="Vector_5" stroke="var(--stroke-0, #F1EFE9)" strokeDasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[3.47%_1.37%_10.42%_5.47%]" data-name="Group">
      <Group17 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute inset-[8.85%_1.37%_10.42%_5.47%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-25.5px] mask-size-[681px_261px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <div className="absolute inset-[-0.65%_0_0_-0.13%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682.175 234">
          <g id="Group">
            <path d={svgPaths.p2aa45800} fill="url(#paint0_linear_43_293)" id="Vector" />
            <path d={svgPaths.p23cfce00} id="Vector_2" stroke="var(--stroke-0, #23384F)" strokeWidth="3" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_43_293" x1="0.87402" x2="0.87402" y1="1.5" y2="234">
              <stop offset="0.05" stopColor="#23384F" stopOpacity="0.15" />
              <stop offset="0.95" stopColor="#23384F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[8.85%_1.37%_10.42%_5.47%]" data-name="Group">
      <Group21 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_1.37%_9.38%_5.47%]" data-name="Clip path group">
      <Group20 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[0_1.37%_9.38%_5.47%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[0_1.37%_9.38%_5.47%]" data-name="Group">
      <Group19 />
    </div>
  );
}

function Surface() {
  return (
    <div className="absolute h-[288px] left-0 overflow-clip top-0 w-[731px]" data-name="Surface">
      <Group />
      <Group9 />
      <Group16 />
      <Group18 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[288px] relative shrink-0 w-full" data-name="Container">
      <Surface />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#fcfaf6] content-stretch drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] flex flex-col gap-[24px] h-[421.575px] items-start left-0 pb-[0.8px] pt-[24.8px] px-[24.8px] rounded-[24px] top-0 w-[780.8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f1efe9] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#23384f] text-[18px] top-[0.4px] whitespace-nowrap">Rasio Status Pemrosesan</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(35,56,79,0.6)] top-[-0.2px] whitespace-nowrap">Distribusi status dokumen</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col h-[48px] items-start left-[24px] top-[24px] w-[328.8px]" data-name="Container">
      <Heading2 />
      <Paragraph12 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute inset-[14.84%_22.64%_26.94%_22.64%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 149.045">
        <g id="Group">
          <path d={svgPaths.p1610cf0} fill="var(--fill-0, #BAFFC9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute inset-[69.67%_38.87%_14.84%_31%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.1255 39.6463">
        <g id="Group">
          <path d={svgPaths.pcd96a80} fill="var(--fill-0, #BAE1FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute inset-[62.41%_25.63%_19.25%_60.32%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.2539 46.9364">
        <g id="Group">
          <path d={svgPaths.p154f4e00} fill="var(--fill-0, #FFDFBA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute inset-[52.38%_22.75%_36.83%_69.73%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7547 27.6137">
        <g id="Group">
          <path d={svgPaths.p3aa56e00} fill="var(--fill-0, #FFD1DC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[14.84%_22.64%]" data-name="Group">
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[14.84%_22.64%]" data-name="Group">
      <Group23 />
    </div>
  );
}

function Surface1() {
  return (
    <div className="absolute h-[256px] left-0 overflow-clip top-0 w-[329px]" data-name="Surface">
      <Group22 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[256px] left-0 top-0 w-[328.8px]" data-name="Container">
      <Surface1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[56.163px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(35,56,79,0.6)] whitespace-nowrap">Total Data</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col h-[256px] items-center justify-center left-0 pb-[102.012px] pt-[102px] top-0 w-[328.8px]" data-name="Container">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[36px] relative shrink-0 text-[#23384f] text-[30px] whitespace-nowrap">100%</p>
      <Text1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[256px] left-[24px] top-[80px] w-[328.8px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return <div className="bg-[#baffc9] relative rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[41.213px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(35,56,79,0.8)] whitespace-nowrap">Selesai</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15.988px] items-center left-[24px] top-[352px] w-[158.4px]" data-name="Container">
      <Container29 />
      <Text2 />
    </div>
  );
}

function Container31() {
  return <div className="bg-[#bae1ff] relative rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[51.45px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(35,56,79,0.8)] whitespace-nowrap">Diproses</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15.988px] items-center left-[194.4px] top-[352px] w-[158.4px]" data-name="Container">
      <Container31 />
      <Text3 />
    </div>
  );
}

function Container33() {
  return <div className="bg-[#ffdfba] relative rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[61.288px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(35,56,79,0.8)] whitespace-nowrap">Menunggu</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15.988px] items-center left-[24px] top-[379.99px] w-[158.4px]" data-name="Container">
      <Container33 />
      <Text4 />
    </div>
  );
}

function Container35() {
  return <div className="bg-[#ffd1dc] relative rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[34.362px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(35,56,79,0.8)] whitespace-nowrap">Gagal</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15.988px] items-center left-[194.4px] top-[379.99px] w-[158.4px]" data-name="Container">
      <Container35 />
      <Text5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#fcfaf6] border-[#f1efe9] border-[0.8px] border-solid drop-shadow-[0px_4px_10px_rgba(35,56,79,0.02)] h-[421.575px] left-[804.8px] rounded-[24px] top-0 w-[378.4px]" data-name="Container">
      <Container24 />
      <Container25 />
      <Container28 />
      <Container30 />
      <Container32 />
      <Container34 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[421.575px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container23 />
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[647.163px] items-start relative shrink-0 w-full" data-name="AdminDashboard">
      <Container7 />
      <Container10 />
      <Container19 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#f1efe9] flex-[665.6_0_0] min-h-px relative w-[1278.4px]" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[40px] pr-[55.2px] pt-[40px] relative size-full">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1278.4_0_0] h-[729.6px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TopNav />
        <MainContent />
      </div>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div className="bg-[#f1efe9] content-stretch flex h-[729.6px] items-start overflow-clip relative shrink-0 w-[1534.4px]" data-name="DashboardLayout">
      <Sidebar />
      <Container2 />
    </div>
  );
}

export default function AiNewspaperLayoutTool() {
  return (
    <div className="bg-[#f1efe9] content-stretch flex flex-col items-start pr-[-0.4px] relative size-full" data-name="AI Newspaper Layout Tool">
      <DashboardLayout />
    </div>
  );
}