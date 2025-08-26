import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //  Récupérer tous les événements valides
  const validEvents = (data?.events || []).filter(
    (event) => event?.cover && event?.title && event?.date && event?.type
  );

  //  Filtrer par type si nécessaire
  const eventsByType = validEvents.filter((event) => !type || event.type === type);

  //  Calculer le nombre total de pages
  const pageNumber = Math.ceil(eventsByType.length / PER_PAGE);

  //  Appliquer la pagination sur les événements filtrés
  const paginatedEvents = eventsByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser à la page 1 lors du changement de type
    setType(evtType);
  };

  const typeList = new Set(validEvents.map((event) => event.type));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
            
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, event) => (
              <a
                key={event.id}
                href="#events"
                onClick={() => setCurrentPage(event + 1)}
                className={currentPage === event + 1 ? "active" : ""}
              >
                {event + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
