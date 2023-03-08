export default EmptyOffer;

function EmptyOffer(): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container cities__places-container--empty">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            {/* TODO: show city name from props */}
            <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}
