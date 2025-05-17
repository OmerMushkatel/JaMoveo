interface AutoScrollProps {
  autoScroll: boolean;
  setAutoScroll: (value: boolean) => void;
}

export default function AutoScroll({
  autoScroll,
  setAutoScroll,
}: AutoScrollProps) {
  return (
    <div
      className="border-primary fixed right-20 bottom-12 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 bg-white"
      onClick={() => setAutoScroll(!autoScroll)}
    >
      <p className="font-600 text-center">
        {autoScroll ? "STOP" : "Auto Scroll"}
      </p>
    </div>
  );
}
