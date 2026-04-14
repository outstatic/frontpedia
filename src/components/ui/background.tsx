type BackgroundProps = {
  hideMobile?: boolean;
};

export const Background = ({ hideMobile = false }: BackgroundProps) => (
  <div
    className={`${hideMobile ? "hidden md:block" : "block"
      } absolute w-[calc(100vw+2.5rem)] top-0 left-1/2 h-[456px] md:h-[816px] bg-primary -translate-y-1/2 -translate-x-1/2 rounded-[68px] lg:rounded-[400px] shadow-2xl overflow-hidden`}
  >

    <div className="bg-linear-to-r from-slate-900 via-transparent to-slate-900 w-full h-full absolute top-0 left-0" />
    <div className="absolute w-screen top-10 left-1/2 block h-[400px] md:h-[760px] bg-white -translate-x-1/2 rounded-[48px] lg:rounded-[380px] shadow-2xl" />
  </div>
);
