import React from "react";
import { useSelector } from "react-redux";
import "../MyItems/MyItems.css";
import "../../../css/BookingPage.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";
import Requests from "../../../http/axios-requests";
import BookingITake from "../../../components/Profile/BookingITAKE";

const BookingPage = ({ itemData }) => {
  const { subjects } = useSelector(({ userData }) => userData);
  const [outgoingReservations, setOutgoingReservations] = React.useState();
  const [incomingReservations, setIncomingReservations] = React.useState();
  const [activeForm, setActiveForm] = React.useState("myProfile");
  const [activeForm2, setActiveForm2] = React.useState("ITake");
  const [activeForm3, setActiveForm3] = React.useState("all");

  React.useEffect(() => {
    Requests.getOutgoingReservations().then((res) => {
      setOutgoingReservations(res.data);
    });
  }, []);

  React.useEffect(() => {
    Requests.getIncomingReservations().then((res) => {
      setIncomingReservations(res.data);
    });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Бронирование: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  console.log(activeForm2);

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
                          activeForm3 === "completed"
                            ? "container_profile_optional_left_active"
                            : "container_booking_optional-p"
                        }
                        onClick={() => setActiveForm3("completed")}
                      >
                        Завершено
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
                    {activeForm2 === "ITake" &&
                      outgoingReservations &&
                      outgoingReservations.map((item, index) => (
                        <BookingITake item={item} />
                      ))}
                  </div>
                </div>
              </div>
              {/* body down container */}
              <div className="container_profile_content__booking_down">
                <p className="container_profile_content__booking_down-p">
                  Показать больше
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
