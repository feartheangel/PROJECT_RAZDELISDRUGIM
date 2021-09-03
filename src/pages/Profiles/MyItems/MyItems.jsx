import React from "react";
import { ItemCardProfile, ItemDeleteSubmit } from "../../../components/index";
import { useSelector } from "react-redux";
import "./MyItems.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";

const MyItems = () => {
  const { subjects } = useSelector(({ userData }) => userData);

  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Я сдаю: #разделисдругим";
  }, []);

  return (
    <div>
      <Header />
      <div className="privateProfile" id="globaldata_pk">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p className="conteiner_shapka_myProfile">
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Я беру <span> - </span>
            </p>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Мои сообщения <span> - </span>
            </p>
            <Link
              style={{
                textDecoration: "none",
              }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__myItems">
              {subjects &&
                subjects.map((subject, index) => (
                  <ItemCardProfile
                    setDeleteId={setDeleteId}
                    setModalActiveSubmit={setModalActiveSubmit}
                    key={index}
                    title={subject.name_item}
                    category_id={subject.category_id}
                    description={subject.description}
                    image_1={subject.image_1}
                    image_2={subject.image_2}
                    image_3={subject.image_3}
                    image_4={subject.image_4}
                    image_5={subject.image_5}
                    rent={subject.rent}
                    price_rent={subject.price_rent}
                    key_words={subject.key_words}
                    year_release={subject.year_release}
                    mileage={subject.mileage}
                    price_item={subject.price_item}
                    receive_time={subject.receive_time}
                    return_time={subject.return_time}
                    prepare_time={subject.prepare_time}
                    delivery={subject.delivery}
                    delivery_free={subject.delivery_free}
                    self_delivery_price={subject.self_delivery_price}
                    will_send={subject.will_send}
                    will_send_choice={subject.will_send_choice}
                    send_payer={subject.send_payer}
                    servicefee={subject.servicefee}
                    servicefee_choice={subject.servicefee_choice}
                    servicefee_price={subject.servicefee_price}
                    pledge={subject.pledge}
                    pledge_price={subject.pledge_price}
                    insurance={subject.insurance}
                    insurance_choice={subject.insurance_choice}
                    insurance_price={subject.insurance_price}
                    sell={subject.sell}
                    contract={subject.contract}
                    appointment={subject.appointment}
                    structure={subject.structure}
                    free_rent={subject.free_rent}
                    offer_price_rent={subject.offer_price_rent}
                    color={subject.color}
                    franchise={subject.franchise}
                    franchise_price={subject.franchise_price}
                    article={subject.article}
                    inventory_number={subject.inventory_number}
                    coords={subject.coordinates}
                    prepare_time_choice={subject.prepare_time_choice}
                    items_address={subject.items_address}
                    is_hidden={subject.is_hidden}
                    id={subject.id}
                  />
                ))}
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не сдаете.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className="privateProfile" id="globaldata_mobile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p className="conteiner_shapka_myProfile">
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              style={{ display: "none" }}
            >
              Я беру <span> - </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              style={{ display: "none" }}
            >
              Мои сообщения <span> - </span>
            </p>
            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              style={{ display: "none" }}
              to="/private-profile"
            >
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__myItems">
              {subjects &&
                subjects.map((subject, index) => (
                  <ItemCardProfile
                    setDeleteId={setDeleteId}
                    setModalActiveSubmit={setModalActiveSubmit}
                    key={index}
                    title={subject.name_item}
                    category_id={subject.category_id}
                    description={subject.description}
                    image_1={subject.image_1}
                    image_2={subject.image_2}
                    image_3={subject.image_3}
                    image_4={subject.image_4}
                    image_5={subject.image_5}
                    rent={subject.rent}
                    price_rent={subject.price_rent}
                    key_words={subject.key_words}
                    year_release={subject.year_release}
                    mileage={subject.mileage}
                    price_item={subject.price_item}
                    receive_time={subject.receive_time}
                    return_time={subject.return_time}
                    prepare_time={subject.prepare_time}
                    delivery={subject.delivery}
                    delivery_free={subject.delivery_free}
                    self_delivery_price={subject.self_delivery_price}
                    will_send={subject.will_send}
                    will_send_choice={subject.will_send_choice}
                    send_payer={subject.send_payer}
                    servicefee={subject.servicefee}
                    servicefee_choice={subject.servicefee_choice}
                    servicefee_price={subject.servicefee_price}
                    pledge={subject.pledge}
                    pledge_price={subject.pledge_price}
                    insurance={subject.insurance}
                    insurance_choice={subject.insurance_choice}
                    insurance_price={subject.insurance_price}
                    sell={subject.sell}
                    contract={subject.contract}
                    appointment={subject.appointment}
                    structure={subject.structure}
                    free_rent={subject.free_rent}
                    offer_price_rent={subject.offer_price_rent}
                    color={subject.color}
                    franchise={subject.franchise}
                    franchise_price={subject.franchise_price}
                    article={subject.article}
                    inventory_number={subject.inventory_number}
                    coords={subject.coordinates}
                    prepare_time_choice={subject.prepare_time_choice}
                    items_address={subject.items_address}
                    is_hidden={subject.is_hidden}
                    id={subject.id}
                  />
                ))}
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не сдаете.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ItemDeleteSubmit
        deleteId={deleteId}
        setModalActiveSubmit={setModalActiveSubmit}
        modalActiveSubmit={modalActiveSubmit}
      />
    </div>
  );
};

export default MyItems;
