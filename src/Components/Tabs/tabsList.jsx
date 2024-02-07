import { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import PaginationDemo from "../Pagination/pagination";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Stack,
} from "@chakra-ui/react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const baseURL = "http://localhost:8080/filmes";

const TIPO = {
  FILMES: "filmes",
  SERIES: "series",
  ANIMES: "animes",
};

const TabsList = () => {
  const [filmes, setFilmes] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TIPO.FILMES);
 

  const FilterForType = async (tipo) => {
    try {
      const url = tipo ? `${baseURL}/tipo/${tipo}` : baseURL;
      const response = await axios.get(url);
      console.log("ok", tipo);
      console.log(response.data);
      setFilmes(response.data);
    } catch (error) {
      console.error("Erro na requisição", error);
      setError(error);
    }
  };

  function formatarDataEstreia(data_estreia) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(data_estreia).toLocaleDateString("pt-BR", options);
  }

  useEffect(() => {
    FilterForType(activeTab);
  }, [activeTab]);

  return (
    <Formik
      initialValues={{
        id: null,
        name: "",
        tipo: "",
        image: "",
        data_estreia: "",
      }}
    >
      <Tabs
        colorScheme="black"
        isFitted
        variant="enclosed"
        defaultIndex={Object.values(TIPO).indexOf(activeTab)}
      >
        <TabList mb={3} color={"black"}>
          <Tab
            fontWeight={"bold"}
            value="filmes"
            onClick={() => setActiveTab(TIPO.FILMES)}
          >
            Filmes
          </Tab>
          <Tab
            fontWeight={"bold"}
            value="series"
            onClick={() => setActiveTab(TIPO.SERIES)}
          >
            Series
          </Tab>
          <Tab
            fontWeight={"bold"}
            value="animes"
            onClick={() => setActiveTab(TIPO.ANIMES)}
          >
            Animes
          </Tab>
         
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="red.500"
          borderRadius="1px"
        />
        <TabPanels p="5rem" maxW={"100%"}>
          <TabPanel>
            <div>
              <Stack spacing="4">
                <Carousel
                  opts={{
                    align: "start",
                    autoplay: true,
                    interval: 3000,
                  }}
                  className="w-full "
                >
                  <CarouselContent>
                    {filmes &&
                      filmes.map((item) => {
                        const { id, name, image, data_estreia } = item;
                        return (
                          <CarouselItem
                            className="md:basis-1/2 lg:basis-1/3 max-w-80"
                            key={id}
                          >
                            <Link to={`/filmes/${id}`}>
                              <div className="p-1">
                                <Card className="border-0 shadow-none">
                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-base flex items-center justify-center flex-col">
                                      <img
                                        className="w-full h-80"
                                        src={image}
                                      />
                                      <p className="font-bold"> {name}</p>
                                      <p className="font-normal text-sm">
                                        {formatarDataEstreia(data_estreia)}
                                      </p>
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </Stack>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Stack spacing="4">
                <Carousel
                  opts={{
                    align: "start",
                    autoplay: true,
                    interval: 3000,
                  }}
                  className="w-full "
                >
                  <CarouselContent>
                    {filmes &&
                      filmes.map((item) => {
                        const { id, name, image, data_estreia } = item;
                        return (
                          <CarouselItem
                            className="md:basis-1/2 lg:basis-1/3 max-w-80"
                            key={id}
                          >
                            <Link to={`/series/${id}`}>
                              <div className="p-1">
                                <Card className="border-0 shadow-none">
                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-base flex items-center justify-center flex-col">
                                      <img
                                        className="w-full h-80"
                                        src={image}
                                      />
                                      <p className="font-bold"> {name}</p>
                                      <p className="font-normal text-sm">
                                        {formatarDataEstreia(data_estreia)}
                                      </p>
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </Stack>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Stack spacing="4">
                <Carousel
                  opts={{
                    align: "start",
                    autoplay: true,
                    interval: 3000,
                  }}
                  className="w-full "
                >
                  <CarouselContent>
                    {filmes &&
                      filmes.map((item) => {
                        const { id, name, image, data_estreia } = item;
                        return (
                          <CarouselItem
                            className="md:basis-1/2 lg:basis-1/3 max-w-80"
                            key={id}
                          >
                            <Link to={`/animes/${id}`}>
                              <div className="p-1">
                                <Card className="border-0 shadow-none">
                                  <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-base flex items-center justify-center flex-col">
                                      <img
                                        className="w-full h-80"
                                        src={image}
                                      />
                                      <p className="font-bold"> {name}</p>
                                      <p className="font-normal text-sm">
                                        {formatarDataEstreia(data_estreia)}
                                      </p>
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </Link>
                          </CarouselItem>
                        );
                      })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </Stack>
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <Stack spacing="4">
                {filmes && (
                  <div className="grid  gap-16 grid-cols-6">
                    {filmes.map((item) => {
                      const { id, name, image, data_estreia } = item;
                      return (
                        <div key={id} className="flex flex-col text-center justify-center">
                          <img className="w-full h-80" src={image} alt={name} />
                          <div className="font-bold">{name}</div>
                          <div className="text-sm">{formatarDataEstreia(data_estreia)}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <PaginationDemo />
              </Stack>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Formik>
  );
};

export default TabsList;
