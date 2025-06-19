import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  ); // modif > newdate


  const nextCard = () => {
    setTimeout(
      () => setIndex(index  < byDateDesc.length ? index +1 : 0),
      5000
    );
  };
  // rajour index + 1
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.date} > 
        {/* ajout key */}
          <div key={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt={event.title} /> 
            {/* modif alt */}
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date}  
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              //  modif key et checked readonly
              ))}
            </div>
          </div>
          </div>
      ))}
    </div>
  );
};

export default Slider;
