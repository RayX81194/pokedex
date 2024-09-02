export default async function PokeNewCard() {
  let data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  let posts = await data.json();

  // Fetch detailed data for each Pokémon
  const detailedPosts = await Promise.all(
    posts.results.map(async (post) => {
      let detailData = await fetch(post.url);
      let details = await detailData.json();

      // Fetch species data for description
      let speciesData = await fetch(details.species.url);
      let species = await speciesData.json();

      return {
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        type: details.types.map((typeInfo) => typeInfo.type.name).join(', '),
        description: species.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        ).flavor_text,
      };
    })
  );

  return (
    <div className="grid my-10 sm:mx-20 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
      {detailedPosts.map((post, index) => (
        <div
          key={index}
          className="bg-white hover:shadow-xl transition-all hover:scale-105 active:scale-95 shadow-md rounded-xl max-w-[370px] p-4 flex flex-col justify-between"
        >
          <div className="poke-info flex justify-between">
            <p className="text-black font-bold">{index + 1}</p>
          </div>
          <div className="poke-image gap-x-3 flex justify-between">
            <div className="flex flex-col gap-y-1 items-start justify-between">
              <h1 className="font-bold text-black mt-1 text-3xl">{post.name}</h1>
              <p className="text-gray-600">{post.type}</p>
              <img src={post.image} alt={post.name} className="w-20 h-20 object-contain" />
              <p className="text-sm text-gray-700">{post.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
}
