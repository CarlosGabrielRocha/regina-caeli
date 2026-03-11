import Title from "../../../components/Title";
import A from "../../../components/A";
import ProfileButton from "../../../components/buttons/ProfileButton";
import ContainerLimit from "@/components/ContainerLimit";

export default function PropertyHeader() {
  return (
    <>
      <header className="sticky top-0 z-30 w-full px-5 py-3 2xl:py-5 3xl:py-7 bg-primary transition-all duration-300 shadow-sm">
        <ContainerLimit size="small" className="flex items-center justify-between">
          <A href="/">
            <Title size="sm">Regina Caeli</Title>
          </A>
          <ProfileButton />
        </ContainerLimit>
      </header>
    </>
  );
}
