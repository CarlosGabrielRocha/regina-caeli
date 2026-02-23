import Carousel from "../views/carousel";
import Footer from "../views/footer";
import Header from "../views/header";
import New from "../views/mainPage/New";
import Presentation from "../views/mainPage/Presentation";
import TopHighlights from "../views/mainPage/TopHighlights";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  return (
    <>
      <Header />
      <Carousel />
      <TopHighlights searchParams={searchParams} />
      <Presentation />
      <New />
      <Footer />
    </>
  );
}
