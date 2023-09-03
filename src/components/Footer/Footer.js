'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { instagram, facebookcircle, linkedin, whatsapp } from 'boxicons';
import wicon from "../../../public/whatsapp-icon.png";
import styles from "./footer.module.css"; // Make sure to adjust the path

const Footer = () => {
  const [activeMenu, setActiveMenu] = useState('menu1');
  const [citydata, setcitydata] = useState([]);
  const [routedata, setroutedata] = useState([]);

  useEffect(() => {
    fetch('https://backend-taxi.onrender.com/citypage')
      .then((response) => response.json())
      .then((data) => {
        setcitydata(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const uniqueFromRoutes = Array.from(new Set(routedata.map((route) => route.FromRoute)));

  useEffect(() => {
    fetch('https://backend-taxi.onrender.com/routepage')
      .then((response) => response.json())
      .then((data) => {
        setroutedata(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderData = () => {
    const groupedRoutes = {};

    routedata.forEach((route) => {
      const { FromRoute, toRoute } = route;
      if (groupedRoutes[FromRoute]) {
        groupedRoutes[FromRoute].push(toRoute);
      } else {
        groupedRoutes[FromRoute] = [toRoute];
      }
    });

    const activeRoutes = groupedRoutes[activeMenu];

    if (!activeRoutes) {
      return null;
    }

    return (
      <div className={styles.menuContents}>
        <ul>
          <br />
          {activeRoutes.map((route) => (
            <li key={route}>{renderMain(activeMenu, route)}</li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMain = (fromRoute, toRoute) => {
    const selectedRoute = routedata.find((route) => route.FromRoute === fromRoute && route.toRoute === toRoute);
    if (selectedRoute) {
      return (
        <Link href={`/routes/${selectedRoute.customUrl}`}>
          <p>{toRoute}</p>
        </Link>
      );
    }
    return null;
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.containerFooter}>
          <div className={styles.rowFooter}>
            <div className={styles.footerCol}>
              <h4>company</h4>
              <ul>
                <li><a href="#">about us</a></li>
                <li><a href="#">our services </a></li>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">Book now</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>get help</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Why choose us?</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Booking Status</a></li>
                <li><a href="#">payment options</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>online Booking</h4>
              <ul>
                <li><a href="#">Sedan</a></li>
                <li><a href="#">SUV</a></li>
                <li><a href="#">Bus</a></li>
                <li><a href="#">Traveler</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>follow us</h4>
              <div className={styles.socialLinks}>
                <a href="#"><box-icon name='whatsapp' type='logo' color='#ffffff' ></box-icon></a>
                <a href="#"><box-icon type='logo' name='linkedin' color='#ffffff'></box-icon></a>
                <a href="#"><box-icon name='instagram' type='logo' color='#ffffff' ></box-icon></a>
                <a href="#"><box-icon name='facebook-circle' type='logo' color='#ffffff'></box-icon></a>
              </div>
              {/* Footer navtabs */}
              <p className={styles.copyright}>&copy; Copyrights. All rights reserved.</p>
              <p className={styles.copyright}>Made with <i className="bx bxs-heart"> By Webzyro Tech</i></p>
            </div>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.footerColFoot}>
              <h4>Popular Routes From</h4>
              <ul className={styles.menuFoot}>
                {uniqueFromRoutes.map((fromRoute) => (
                 <li
                 key={fromRoute}
                 className={`${styles.menuItem} ${activeMenu === fromRoute.FromRoute ? `${styles.active}` : ''}`}
                 onClick={() => handleMenuClick(fromRoute)}
               >
                 {fromRoute}
               </li>
                ))}
              </ul>
            </div>
            {renderData()}
            <div className={styles.citydata}>
              <h4>Popular Cities</h4>
              <div className={styles.menuContents}>
                <ul>
                  {citydata.map((i, index) => (
                    <li key={index}><Link href={`/city/${i.customUrl}`}>{i.footTitle}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=19059294810"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappFloat}
        >
          <Image src={wicon} alt="WhatsApp" width={50} height={50} />
        </a>
      </footer>
    </>
  );
}

export default Footer;
