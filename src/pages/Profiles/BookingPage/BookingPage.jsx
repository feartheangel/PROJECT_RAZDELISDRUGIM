import React from "react";
import { useSelector } from "react-redux";
import "../MyItems/MyItems.css";
import "../../../css/BookingPage.css";
import { Link } from "react-router-dom";
import { Header, Footer, MapBooking } from "../../../components/index";
import Requests from "../../../http/axios-requests";
import BookingITake from "../../../components/Profile/BookingITAKE";

const BookingPage = () => {
  const { subjects } = useSelector(({ userData }) => userData);
  const [outgoingReservations, setOutgoingReservations] = React.useState();
  const [incomingReservations, setIncomingReservations] = React.useState();
  const [activeForm, setActiveForm] = React.useState("myProfile");
  const [activeForm2, setActiveForm2] = React.useState("ITake");
  const [activeForm3, setActiveForm3] = React.useState("all");
  const [countShowedTables, setCountShowedTables] = React.useState(0);
  const [countShowedTablesCouples, setCountShowedTablesCouples] =
    React.useState(0);
  const [coords, setCoords] = React.useState();

  React.useEffect(() => {
    Requests.getOutgoingReservations().then((res) => {
      setOutgoingReservations(res.data.reverse());
    });
  }, []);

  React.useEffect(() => {
    Requests.getIncomingReservations().then((res) => {
      setIncomingReservations(res.data.reverse());
    });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Бронирования: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  React.useEffect(() => {
    if (activeForm2 === "ITake") {
      if (activeForm3 === "all") {
        setCountShowedTables(
          outgoingReservations &&
            outgoingReservations.filter((item) => item).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "waiting") {
        setCountShowedTables(
          outgoingReservations &&
            outgoingReservations.filter(
              (item) => item.reservation_status === "WAITING"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "success") {
        setCountShowedTables(
          outgoingReservations &&
            outgoingReservations.filter(
              (item) => item.reservation_status === "SUBMITTED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "rejected") {
        setCountShowedTables(
          outgoingReservations &&
            outgoingReservations.filter(
              (item) => item.reservation_status === "DENIED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "canceled") {
        setCountShowedTables(
          outgoingReservations &&
            outgoingReservations.filter(
              (item) => item.reservation_status === "CANCELED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      }
    } else if (activeForm2 === "MyItems") {
      if (activeForm3 === "all") {
        setCountShowedTables(
          incomingReservations &&
            incomingReservations.filter((item) => item).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "waiting") {
        setCountShowedTables(
          incomingReservations &&
            incomingReservations.filter(
              (item) => item.reservation_status === "WAITING"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "success") {
        setCountShowedTables(
          incomingReservations &&
            incomingReservations.filter(
              (item) => item.reservation_status === "SUBMITTED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "rejected") {
        setCountShowedTables(
          incomingReservations &&
            incomingReservations.filter(
              (item) => item.reservation_status === "DENIED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      } else if (activeForm3 === "canceled") {
        setCountShowedTables(
          incomingReservations &&
            incomingReservations.filter(
              (item) => item.reservation_status === "CANCELED"
            ).length
        );
        setCountShowedTablesCouples(1);
        console.log(countShowedTablesCouples);
      }
    }
  }, [activeForm2, activeForm3]);

  const [modalActiveMap, setModalActiveMap] = React.useState(false);

  const showOnMapHandler = (coords) => {
    setModalActiveMap(true);
    setCoords(coords);
  };

  return (
    <div>
      <Header />
      <div className="privateProfile" id="globaldata_pk">
        <div className="privateProfile_container">
          {/* header */}
          <div className="conteiner_shapka">
            <Link style={{ textDecoration: "none" }} to="/i-rent-out">
              <p>
                Мои обьявления <span> {subjects.length} </span>
              </p>
            </Link>

            <p
              className={
                activeForm === "myProfile" && "conteiner_shapka_myProfile"
              }
              onClick={() => setActiveForm("myProfile")}
            >
              Бронирования
            </p>

            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/messages"
            >
              <p>Мои сообщения</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p
                className={
                  activeForm === "favorites" &&
                  "privateProfile_container_favorites"
                }
              >
                Избранное
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          {/* body */}
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__booking">
              <div className="container_profile_content__booking_up">
                {/* left size */}
                <div className="content__booking_left">
                  <div className="container_profile_optional_left">
                    <div>
                      <p
                        className={
                          activeForm3 === "all"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("all")}
                      >
                        Все
                      </p>
                    </div>
                    <div>
                      <p
                        className={
                          activeForm3 === "waiting"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("waiting")}
                      >
                        В ожидании <span className="span_color">2</span>
                      </p>
                    </div>
                    <div>
                      <p
                        className={
                          activeForm3 === "success"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("success")}
                      >
                        Подтверждено
                      </p>
                    </div>
                    <div>
                      <p
                        className={
                          activeForm3 === "rejected"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("rejected")}
                      >
                        Отклонено
                      </p>
                    </div>

                    <div>
                      <p
                        className={
                          activeForm3 === "canceled"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("canceled")}
                      >
                        Отменено
                      </p>
                    </div>
                  </div>
                </div>

                {/* right size */}
                <div className="content__booking_right">
                  <header>
                    <div className="content__booking_right_header">
                      <p
                        onClick={() => setActiveForm2("MyItems")}
                        className={
                          activeForm2 === "MyItems"
                            ? "content__booking_right_header_active"
                            : "content__booking_right_header_left"
                        }
                      >
                        {" "}
                        Я сдаю
                      </p>
                      <p
                        onClick={() => setActiveForm2("ITake")}
                        className={
                          activeForm2 === "ITake"
                            ? "content__booking_right_header_active"
                            : "content__booking_right_header_right"
                        }
                      >
                        {" "}
                        Я беру
                      </p>
                    </div>
                  </header>
                  {/* body right size */}
                  <div>
                    {/* компонент  */}

                    {activeForm2 === "ITake" && activeForm3 === "all"
                      ? outgoingReservations &&
                        outgoingReservations.map((item, index) => (
                          <BookingITake
                            item={item}
                            key={index}
                            type={1}
                            countShowedTablesCouples={countShowedTablesCouples}
                            setOutgoingReservations={setOutgoingReservations}
                            index={index}
                            showOnMapHandler={showOnMapHandler}
                          />
                        ))
                      : activeForm2 === "ITake" && activeForm3 === "waiting"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "WAITING"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "success"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "SUBMITTED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "rejected"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "DENIED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "canceled"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "CANCELED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : ""}

                    {activeForm2 === "MyItems" && activeForm3 === "all"
                      ? incomingReservations &&
                        incomingReservations.map((item, index) => (
                          <BookingITake
                            item={item}
                            key={index}
                            type={2}
                            countShowedTablesCouples={countShowedTablesCouples}
                            setIncomingReservations={setIncomingReservations}
                            index={index}
                            showOnMapHandler={showOnMapHandler}
                          />
                        ))
                      : activeForm2 === "MyItems" && activeForm3 === "waiting"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "WAITING"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "success"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "SUBMITTED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "rejected"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "DENIED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "canceled"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "CANCELED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : ""}

                    {countShowedTables === 0 && (
                      <div className="content__booking_empty">
                        <p className="content__booking_empty__p">
                          Нет бронирований в этой категории
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* body down container */}
              <div className="container_profile_content__booking_down">
                <p
                  style={
                    countShowedTables - countShowedTablesCouples * 3 <= 0
                      ? { display: "none" }
                      : {}
                  }
                  onClick={() =>
                    setCountShowedTablesCouples((prev) => prev + 1)
                  }
                  className="container_profile_content__booking_down-p"
                >
                  Показать больше
                </p>
              </div>
            </div>
          </div>
        </div>
        <MapBooking
          modalActiveMap={modalActiveMap}
          setModalActiveMap={setModalActiveMap}
          coords={coords}
        />
      </div>

      {/* MOBILE  */}

      <div className="privateProfile" id="globaldata_mobile">
        <div className="privateProfile_container">
          {/* header */}
          <div className="conteiner_shapka" style={{ display: "none" }}>
            <Link style={{ textDecoration: "none" }} to="/i-rent-out">
              <p>
                Мои обьявления <span> {subjects.length} </span>
              </p>
            </Link>

            <p
              className={
                activeForm === "myProfile" && "conteiner_shapka_myProfile"
              }
              onClick={() => setActiveForm("myProfile")}
            >
              Бронирования
            </p>

            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/messages"
            >
              <p>Мои сообщения</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p
                className={
                  activeForm === "favorites" &&
                  "privateProfile_container_favorites"
                }
              >
                Избранное
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          {/* body */}
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__booking">
              <div className="container_profile_content__booking_up">
                {/* right size */}
                <div className="content__booking_right">
                  <header>
                    <div className="content__booking_right_header-p">
                      Бронирования
                    </div>
                    <div className="content__booking_right_header">
                      <p
                        onClick={() => setActiveForm2("MyItems")}
                        className={
                          activeForm2 === "MyItems"
                            ? "content__booking_right_header_active"
                            : "content__booking_right_header_left"
                        }
                      >
                        {" "}
                        Я сдаю
                      </p>
                      <p
                        onClick={() => setActiveForm2("ITake")}
                        className={
                          activeForm2 === "ITake"
                            ? "content__booking_right_header_active"
                            : "content__booking_right_header_right"
                        }
                      >
                        {" "}
                        Я беру
                      </p>
                    </div>
                    {/* left size */}
                    <div className="content__booking_left">
                      <div className="content__booking_left">
                        <div
                          className={
                            activeForm3 === "all"
                              ? "container_profile_optional_left_div_active"
                              : "container_profile_optional_left_div"
                          }
                        >
                          <p
                            className={
                              activeForm3 === "all"
                                ? "container_profile_optional_left_active"
                                : "container_booking_optional-p"
                            }
                            onClick={() => setActiveForm3("all")}
                          >
                            Все
                          </p>
                        </div>
                        <div
                          className={
                            activeForm3 === "waiting"
                              ? "container_profile_optional_left_div_active"
                              : "container_profile_optional_left_div"
                          }
                        >
                          <p
                            className={
                              activeForm3 === "waiting"
                                ? "container_profile_optional_left_active"
                                : "container_booking_optional-p"
                            }
                            onClick={() => setActiveForm3("waiting")}
                          >
                            В ожидании <span className="span_color">2</span>
                          </p>
                        </div>
                        <div
                          className={
                            activeForm3 === "success"
                              ? "container_profile_optional_left_div_active"
                              : "container_profile_optional_left_div"
                          }
                        >
                          <p
                            className={
                              activeForm3 === "success"
                                ? "container_profile_optional_left_active"
                                : "container_booking_optional-p"
                            }
                            onClick={() => setActiveForm3("success")}
                          >
                            Подтверждено
                          </p>
                        </div>
                        <div
                          className={
                            activeForm3 === "rejected"
                              ? "container_profile_optional_left_div_active"
                              : "container_profile_optional_left_div"
                          }
                        >
                          <p
                            className={
                              activeForm3 === "rejected"
                                ? "container_profile_optional_left_active"
                                : "container_booking_optional-p"
                            }
                            onClick={() => setActiveForm3("rejected")}
                          >
                            Отклонено
                          </p>
                        </div>

                        <div
                          className={
                            activeForm3 === "canceled"
                              ? "container_profile_optional_left_div_active"
                              : "container_profile_optional_left_div"
                          }
                        >
                          <p
                            className={
                              activeForm3 === "canceled"
                                ? "container_profile_optional_left_active"
                                : "container_booking_optional-p"
                            }
                            onClick={() => setActiveForm3("canceled")}
                          >
                            Отменено
                          </p>
                        </div>
                      </div>
                    </div>
                  </header>
                  {/* body right size */}
                  <div>
                    {/* компонент  */}

                    {activeForm2 === "ITake" && activeForm3 === "all"
                      ? outgoingReservations &&
                        outgoingReservations.map((item, index) => (
                          <BookingITake
                            item={item}
                            key={index}
                            type={1}
                            countShowedTablesCouples={countShowedTablesCouples}
                            setOutgoingReservations={setOutgoingReservations}
                            index={index}
                            showOnMapHandler={showOnMapHandler}
                          />
                        ))
                      : activeForm2 === "ITake" && activeForm3 === "waiting"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "WAITING"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "success"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "SUBMITTED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "rejected"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "DENIED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "ITake" && activeForm3 === "canceled"
                      ? outgoingReservations &&
                        outgoingReservations
                          .filter(
                            (item) => item.reservation_status === "CANCELED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={1}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setOutgoingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : ""}

                    {activeForm2 === "MyItems" && activeForm3 === "all"
                      ? incomingReservations &&
                        incomingReservations.map((item, index) => (
                          <BookingITake
                            item={item}
                            key={index}
                            type={2}
                            countShowedTablesCouples={countShowedTablesCouples}
                            setIncomingReservations={setIncomingReservations}
                            index={index}
                            showOnMapHandler={showOnMapHandler}
                          />
                        ))
                      : activeForm2 === "MyItems" && activeForm3 === "waiting"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "WAITING"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "success"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "SUBMITTED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "rejected"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "DENIED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setOutgoingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : activeForm2 === "MyItems" && activeForm3 === "canceled"
                      ? incomingReservations &&
                        incomingReservations
                          .filter(
                            (item) => item.reservation_status === "CANCELED"
                          )
                          .map((item, index) => (
                            <BookingITake
                              item={item}
                              key={index}
                              type={2}
                              countShowedTablesCouples={
                                countShowedTablesCouples
                              }
                              setIncomingReservations={setIncomingReservations}
                              index={index}
                              showOnMapHandler={showOnMapHandler}
                            />
                          ))
                      : ""}

                    {countShowedTables === 0 && (
                      <div className="content__booking_empty">
                        <p className="content__booking_empty__p">
                          Нет бронирований в этой категории
                        </p>
                      </div>
                    )}
                    <p
                      style={
                        countShowedTables - countShowedTablesCouples * 3 <= 0
                          ? { display: "none" }
                          : {}
                      }
                      onClick={() =>
                        setCountShowedTablesCouples((prev) => prev + 1)
                      }
                      className="container_profile_content__booking_down-p"
                    >
                      Показать больше
                    </p>
                  </div>
                </div>
              </div>
              {/* body down container */}
              <div className="container_profile_content__booking_down"></div>
            </div>
          </div>
        </div>
        <MapBooking
          modalActiveMap={modalActiveMap}
          setModalActiveMap={setModalActiveMap}
          coords={coords}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
