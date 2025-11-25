import PropertyCard from "@/components/PropertyCard";


export default function Home() {
  return (
    <div className="flex justify-between flex-wrap w-full gap-5 p-10">
      <PropertyCard.Container>
        <PropertyCard.Header
          imgSrc="/images/apartament-placeholder1.jpg"
          imgAlt="Apartamento"
          price="100.000,00"
          bedrooms={3}
          bathrooms={2}
        />
        <PropertyCard.Body>
          <PropertyCard.Title>
            Apartamento espaçoso no centro da cidade
          </PropertyCard.Title>
          <PropertyCard.Description>
            Este apartamento de 3 quartos e 2 banheiros está localizado no
            coração da cidade, próximo a todas as comodidades. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Eos dicta cumque,
            necessitatibus molestiae ab assumenda beatae illo neque cupiditate
            exercitationem error provident impedit rerum enim perspiciatis
            blanditiis modi mollitia ex.
          </PropertyCard.Description>
        </PropertyCard.Body>
      </PropertyCard.Container>

      <PropertyCard.Container>
        <PropertyCard.Header
          imgSrc="/images/apartament-placeholder1.jpg"
          imgAlt="Apartamento"
          price="100.000,00"
          bedrooms={3}
          bathrooms={2}
        />
        <PropertyCard.Body>
          <PropertyCard.Title>
            Apartamento espaçoso no centro da cidade
          </PropertyCard.Title>
          <PropertyCard.Description>
            Este apartamento de 3 quartos e 2 banheiros está localizado no
            coração da cidade, próximo a todas as comodidades.
          </PropertyCard.Description>
        </PropertyCard.Body>
      </PropertyCard.Container>
    </div>
  );
}
