import Title from "../components/Title";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4">
      <div className="size-12 border-4 border-highlight border-t-transparent rounded-full animate-spin" />
      <Title size="sm" className="opacity-80 animate-pulse">
        Carregando...
      </Title>
    </div>
  );
}
