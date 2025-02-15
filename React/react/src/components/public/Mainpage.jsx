import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/mainpage.css';


function Mainpage() {
  const headerRef = useRef(null);
  const aboutUsLinkRef = useRef(null);
  const footerLinkRef = useRef(null);

 

  useEffect(() => {
    // Handle scroll behavior for header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current.classList.add("scrolled");
      } else {
        headerRef.current.classList.remove("scrolled");
      }
    };

    // Smooth scrolling for About Us link
    const handleAboutUsClick = (event) => {
      event.preventDefault();
      document.getElementById('aboutus').scrollIntoView({
        behavior: 'smooth',
      });
    };

    // Smooth scrolling for Footer link
    const handleFooterClick = (event) => {
      event.preventDefault();
      document.getElementById('footer').scrollIntoView({
        behavior: 'smooth',
      });
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    const aboutUsLink = aboutUsLinkRef.current;
    const footerLink = footerLinkRef.current;
    aboutUsLink.addEventListener('click', handleAboutUsClick);
    footerLink.addEventListener('click', handleFooterClick);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      aboutUsLink.removeEventListener('click', handleAboutUsClick);
      footerLink.removeEventListener('click', handleFooterClick);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <header ref={headerRef}>
        <div className="imagecontainer">
          <img src="./Images/logo3.png" alt="logo" />
        </div>
        <ul>
          <li><a href="#">Home</a></li>
          <li>
            <a href="#footer" id="footer-link" ref={footerLinkRef}>Contact</a>
          </li>
          <li>
            <a href="#aboutus" id="aboutus-link" ref={aboutUsLinkRef}>About Us</a>
          </li>
        </ul>
        <div className="bought">
          <Link to="/bought">
            <img src="./Images/Booked.png" alt="bought" />
          </Link>
        </div>
        <div className="cart">
          <Link to="/cart">
            <img src="./Images/cart.jpg" alt="cart" />
          </Link>
        </div>
        <div className="logout">
          <Link to="/login">
            <img src="./Images/logout.png" alt="logout" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="Container">
        <div className="information">
          <h1>Your Ultimate Football Store</h1>
          <br />
          <h2>Choose quality over quantity</h2>
        </div>
        <div className="main">
          <img src="./Images/background.jpg" alt="Img" />
        </div>
      </div>

      {/* Jerseys Section */}
      <div className="jerseyheading">
        <h1>Jerseys</h1>
      </div>
      <div className="jerseyshow">
        <div className="jersey1" id="1">
          <img src="./Images/jersey4.png" alt="jersey1" />
          <h1>Nepal Jersey Blue</h1>
          <h2>Rs 1500 |-</h2>
          <Link to="/booknow" state={{ productName: "Nepal Jersey Blue", price: 1500 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Nepal Jersey Blue", price: 1500 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
         
        </div>
        <div className="jersey2" id="2">
          <img src="./Images/jersey2.jpg" alt="jersey2" />
          <h1>Premium Black Jersey</h1>
          <h2>Rs 3000 |-</h2>
          <Link to="/booknow" state={{ productName: "Premium Black Jersey", price: 3000 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Premium Black Jersey", price: 3000 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
          
        </div>
        <div className="jersey3" id="3">
          <img src="./Images/jersey3.jpg" alt="jersey3" />
          <h1>Nepal Red Jersey</h1>
          <h2>Rs 1100 |-</h2>
          <Link to="/booknow" state={{ productName: "Nepal Red Jersey", price: 1100 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Nepal Red Jersey", price: 1100 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
          
        </div>
      </div>

      {/* Boots Section */}
      <div className="bootheading">
        <h1>Boots</h1>
      </div>
      <div className="bootshow">
        <div className="boot1" id="1">
          <img src="./Images/boot1.jpg" alt="boot1" />
          <h1>Vega</h1>
          <h2>Rs 1250 |-</h2>
          <Link to="/booknow" state={{ productName: "Vega", price: 1250 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Vega", price: 1250 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
          
        </div>
        <div className="boot2" id="2">
          <img src="./Images/boot2.jpg" alt="boot2" />
          <h1>White Premium</h1>
          <h2>Rs 3000 |-</h2>
          <Link to="/booknow" state={{ productName: "White Premium", price: 3000 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "White Premium", price: 3000 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
          
        </div>
        <div className="boot3" id="3">
          <img src="./Images/boot3.jpg" alt="boot3" />
          <h1>Nike M10 Edition</h1>
          <h2>Rs 9000 |-</h2>
          <Link to="/booknow" state={{ productName: "Nike M10 Edition", price: 9000 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Nike M10 Edition", price: 9000 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
         
        </div>
      </div>

      {/* Socks & Shin Guards Section */}
      <div className="sockshinguardheading">
        <h1>Socks & Shin Guards</h1>
      </div>
      <div className="sockshinguard">
        <div className="sockshin1" id="1">
          <img src="./Images/sock.jpg" alt="sockshin1" />
          <h1>Black Fiber Edition</h1>
          <h2>Rs 800 |-</h2>
          <Link to="/booknow" state={{ productName: "Black Fiber Edition", price: 800 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Black Fiber Edition", price: 800 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
          
        </div>
        <div className="sockshin2" id="2">
          <img src="./Images/sockshinguard.jpg" alt="sockshin2" />
          <h1>Combo Dashain Offer</h1>
          <h2>Rs 2000 |-</h2>
          <Link to="/booknow" state={{ productName: "Combo Dashain Offer", price: 2000 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Combo Dashain Offer", price: 2000 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
         
        </div>
        <div className="sockshin3" id="3">
          <img src="./Images/shinguard.jpg" alt="sockshin3" />
          <h1>Sponge Premium Shin Guard</h1>
          <h2>Rs 1075 |-</h2>
          <Link to="/booknow" state={{ productName: "Sponge Premium Shin Guard", price: 1075 }}>
            <button className="bn3">Buy Now</button>
          </Link>
          <Link to="/addtocart" state={{ productName: "Sponge Premium Shin Guard", price: 1075 }}>
            <button className="bn3">Add to Cart</button>
          </Link>
         
        </div>
      </div>

      {/* About Us Section */}
      <div className="aboutus" id="aboutus">
        <div className="about1" id="1">
          <img src="./Images/aboutus.jpg" alt="aboutus" />
        </div>
        <div className="about2" id="2">
          <h1>Welcome to Footmandu</h1>
          <p>Where passion meets the pitch!</p>
          <p>Footmandu is Nepal&apos;s premier destination for football enthusiasts</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer>
        <div className="footer" id="footer">
          <div className="mainfooter">
            <div className="row">
              <img src="./Images/logo3.png" alt="logo2" />
              <div className="footer1">
                <h1>Our specialities</h1>
                <p>We specialize in providing high-quality football kits</p>
                <p>We ensure secure and hassle-free online shopping</p>
                <p>Our store offers exclusive discounts</p>
              </div>
              <div className="footer2">
                <h1>Contact</h1>
                <p>Number: 01 9875604 || 9876124532</p>
                <p>Email: footmandu2081@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>Footmandu @ 2025 - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Mainpage;