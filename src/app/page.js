import Image from "next/image";
import Card from "@/compoments/card";
import MongoClient from "mongodb";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import styles from "@/styles/Home.module.css";
import GetStaticProps from "next";

export async function getStaticProps() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_host}`;

  const client = new MongoClient(uri);

  const database = client.db("APK");
  const movies = database.collection("Beer");

  const cursor = movies.find();
  const allValues = await cursor.toArray();
  return {
    props: { beer: allValues },
  };
}

import { useState } from "react";
export default function Home({ beer }) {
  const [sortedbeer, setSortedbeer] = useState(beer);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLang, setShowLang] = useState(false);

  const sortApkUP = () => {
    sortedbeer.sort(function (a, b) {
      return b.APK - a.APK;
    });
    setSortedbeer(JSON.parse(JSON.stringify(sortedbeer)));
  };
  const sortPriceUP = () => {
    sortedbeer.sort(function (a, b) {
      return b.price - a.price;
    });
    setSortedbeer(JSON.parse(JSON.stringify(sortedbeer)));
  };

  const sortPriceDown = () => {
    sortedbeer.sort(function (a, b) {
      return a.price - b.price;
    });
    setSortedbeer(JSON.parse(JSON.stringify(sortedbeer)));
  };

  const sortLangBurk = () => {
    setShowLang(!showLang);
    if (!showLang) {
      const sortedbeer1 = sortedbeer.filter((beer) => beer.volume < 331);
      setSortedbeer(JSON.parse(JSON.stringify(sortedbeer1)));
    } else {
      setSortedbeer(JSON.parse(JSON.stringify(beer)));
    }
  };

  const sorts = [
    { label: "Sortera på APK", sortFunc: sortApkUP },
    { label: "Sortera på pris (Låg - Hög)", sortFunc: sortPriceDown },
    { label: "Sortera på pris (Hög - Låg)", sortFunc: sortPriceUP },
    { label: "Långburkar", sortFunc: sortLangBurk },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Beers</title>
      </Head>

      <main className={styles.main}>
        <menu className={styles.menu}>
          <h1>Alla Öler</h1>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className={styles.filter}>
                  Filter
                  <ChevronDownIcon
                    className={
                      open
                        ? "rotate-180 transform duration-200 w-6 h-6"
                        : "w-6 h-6  transform duration-200"
                    }
                  />
                </Menu.Button>

                {/* Use the `Transition` component. */}
                <Transition
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  {/* Mark this component as `static` */}
                  <Menu.Items static className="bg-gray-500 rounded">
                    {sorts.map((sort) => (
                      <Menu.Item
                        as="div"
                        className={styles.item}
                        key={sort.label.toString()}
                        onClick={sort.sortFunc}
                      >
                        <a>{sort.label}</a>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>

          <input
            type="text"
            placeholder="Type your search here"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </menu>

        <div className={styles.grid}>
          {sortedbeer
            .filter((beer) => {
              if (searchTerm == "") {
                return beer;
              } else if (
                beer.nameThin != null &&
                (beer.name
                  .toLowerCase()
                  .startsWith(searchTerm.toString().toLowerCase()) ||
                  beer.nameThin
                    .toLowerCase()
                    .startsWith(searchTerm.toString().toLowerCase()))
              ) {
                return beer;
              } else if (
                beer.name
                  .toLowerCase()
                  .startsWith(searchTerm.toString().toLowerCase())
              ) {
                return beer;
              }
            })
            .map((beer) => (
              <Card product={beer} key={beer._id}></Card>
            ))}
        </div>
      </main>
    </div>
  );
}
