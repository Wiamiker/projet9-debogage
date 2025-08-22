import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus?.sort((evtA, evtB) => {
     if (!evtA.date) return 1;
    if (!evtB.date) return -1;
  
     return new Date(evtA.date) < new Date(evtB.date)? -1 : 1;
}) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => 
        prevIndex === (byDateDesc.length - 1) ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === byDateDesc.indexOf(event) ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
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
              {byDateDesc.map((dot) => (
                <input
                  key={dot.title}
                  type="radio"
                  name="radio-button"
                  checked={index === byDateDesc.indexOf(dot)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
