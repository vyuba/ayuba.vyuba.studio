const DOT_PATTERN_BG = `url("data:image/svg+xml;utf8,<svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='9' cy='9' r='1' fill='%23DADADA'/></svg>")`;

export default function PlaygroundSection() {
  return (
    <section className="w-full mt-10 [content-visibility:auto] [contain-intrinsic-size:0_50dvh]">
      {/* <h3 className="font-mono uppercase font-normal px-3">Playground</h3> */}
      <div
        className="w-full h-[50dvh] bg-[#f4f4f4] rounded-lg relative"
        style={{
          backgroundImage: DOT_PATTERN_BG,
          backgroundRepeat: "repeat",
        }}
      >
        <h1 className="text-2xl md:text-4xl font-medium text-zinc-950 text-pretty max-w-[750px] p-5">
          I&apos;m obsessed with the why behind digital experiences. For me,
          good design isn&apos;t about shipping features it&apos;s about
          removing friction and rejecting manipulation.{" "}
        </h1>
        <div className="bg-white scale-50 md:scale-100 w-[180px] h-[250px] cursor-pointer absolute top-2.5 right-2.5 p-1 rounded-lg">
          <div className="w-full bg-blue-500 h-full rounded-md" />
        </div>
        <div className="bg-white scale-50 md:scale-100 w-[180px] h-[250px] cursor-pointer absolute bottom-2.5 right-20.5 p-1 rounded-lg">
          <div className="w-full bg-orange-500 h-full rounded-md" />
        </div>
        <div className="bg-white scale-50 md:scale-100 w-[180px] h-[250px] cursor-pointer absolute bottom-10.5 left-20.5 p-1 rounded-lg">
          <div className="w-full bg-orange-500 h-full rounded-md" />
        </div>
      </div>
    </section>
  );
}
