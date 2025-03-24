import games from '../../../lib/games.json';

export default function Carousel() {
  return (
    <div>
      <div>
        {games.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
