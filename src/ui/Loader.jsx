function Loader() {
  return (
    //inset make top bottom left right all 0
    // /after bg-slate-200 is opacity we can give it between 0 to 100
    <div className="absolute flex items-center justify-center bg-slate-200/20 inset-0 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
