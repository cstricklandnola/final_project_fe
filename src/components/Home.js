import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./home.css";

const Home = (props) => {
  const { products, guestCart, setGuestCart } = props;
  const userKey = document.cookie;

  const handleSubmitAddToCart = async (item) => {
    try {
      //Check state to see if an order has been started. If it hasn't been, start a new order. If it has been, add item.

      //orders/

      if (userKey == 0) {
        //make array!
        let tempArray = guestCart;

        tempArray.push(item);
        setGuestCart(tempArray);
        localStorage.setItem(
          "cart",
          JSON.stringify({
            guestCart,
          })
        );
      } else {
        axios.post("https://intense-lowlands-29407.herokuapp.com/api/orders/", {
          orderId: userKey,
          productId: item.id,
          status: "Processing",
          quantity: "1",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterResults = products.filter(function (dummy) {
    return dummy.isActive === true && dummy.featured === true;
  });

  return (
    <div class="home">
      <div class="limit">
        <Carousel>
          {filterResults?.map((item, index) => {
            return (
              <Carousel.Item interval={5000} id="carousel">
                <img
                  className="d-block w-100"
                  src={item.img}
                  alt="Oil Painting"
                  overflow="hidden"
                />
                <Carousel.Caption>
                  <h1>{item.name}</h1>
                  <p>{item.price}</p>
                  <Button
                    type="button"
                    onClick={() => handleSubmitAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <hr id="line" />
        <div class="info">
          <h2>ABOUT CRESCENT CITY ART COLLECTION</h2>
          <p>
            At Crescent City Art Collection, we want everyone to be inspired by
            art every day. Down in the Crescent City, we are constantly reminded
            of the importance that art brings to our lives on a daily basis, so
            we’re on a mission to expand this passion for creative expression to
            support more artists and art around the world. As a burgeoning
            marketplace to discover, buy, and sell fine art, CCAC believes that
            the process of buying art should be as easy as a stoke of paint
            caressing a canvas. That’s why we’re dedicated to our craft that
            connects collectors with the artists and artworks they admire.{" "}
          </p>
          <h2>DISCOVER MORE CREATIVITY</h2>
          <p>
            Discover your inner creativity by purchasing art the speaks to you,
            get trendy insights, and buy and sell with confidence. We strive to
            connect collectors to the art they care about, featuring a diverse
            selection of international emerging, established, and blue-chip
            artists. Starting out of a humble bungalow along the Bayou St. John, we are blossomed into an international online presence, providing the world with art that transcends the boundaries of time. Yes that's right, we've got you covered from Picasso to
            Njideka Akunyili Crosby...
          </p>
        </div>
        <div class="featured__container">
          <div class="featured">
            <h2>FEATURED ARTIST</h2>
            <p>
              The universe Nigerian-American Njideka Akunyili Crosby depicts in
              her work is, according to her, neither Nigeria nor America, but
              some other space, the space that every immigrant occupies.
              Akunyili Crosby creates colourful collage paintings which weave
              together intimate moments with commercial images from Nigeria, and
              reference Nigeria’s history and postcolonial present.
            </p>

            <p>
              The paintings live and breathe her trans- and multicultural fine
              arts fascination and identity. Akunyili Crosby became the talk of
              the contemporary art world when the price of her work soared
              dramatically. Last year, her pieces went from selling for around
              $100,000 to selling for more than $3 million, clearly
              demonstrating she is one of the most popular artists today. You can find her piece "The Beautyful Ones" in the listings.
            </p>
          </div>
        </div>
      </div>
      <hr id="line" />
      <div class="footer__container">
        <div class="footer__links">
          <div class="footer__link--wrapper">
            <div class="footer__link--items">
              <h3>Service</h3>
              <a href="#">FAQS</a>
            </div>
            <div class="footer__link--items">
              <h3>Company</h3>
              <a href="#">About CCAS</a>
            </div>
          </div>
          <div class="footer__link--wrapper">
            <div class="footer__link--items">
              <h3>Get in touch</h3>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <section class="social__media">
            <div class="social__media--wrap">
              <div class="footer__logo">
                <a href="">CRESCENT CITY ART COLLECTION</a>
              </div>
              <p class="website__rights">Copyright © 2021 CCAS </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
