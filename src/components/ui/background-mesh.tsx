const BackgroundMesh = ({ size = "w-1/4", color = "bg-primary" }) => {
  return (
    <div
      className={`absolute ${size} aspect-square ${color} top-1/2 left-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-[100px] dark:opacity-65`}
    ></div>
  );
};

export default BackgroundMesh;
