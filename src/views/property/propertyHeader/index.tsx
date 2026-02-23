import Title from "../../../components/Title";
import A from "../../../components/A";
import ProfileButton from "../../../components/buttons/ProfileButton";

export default function PropertyHeader() {
  return (
    <>
      <header className="flex items-center justify-between w-full px-5 py-3 2xl:py-4 bg-primary transition-all duration-300 shadow-sm">
        <A href="/">
          <Title size="sm">Dayse Rocha</Title>
        </A>
        <ProfileButton />
      </header>
    </>
  );
}
