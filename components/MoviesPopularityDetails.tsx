import React, { useState } from "react";
import { MoviesPopularityProps } from "@/types";
import {
  Container,
  IconButton,
  useBreakpointValue,
  Box,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import Head from "next/head";


// Settings for the slider
const settings = {
    
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        }
      }
    ]
};

export const MoviesPopularityDetails: React.FC<MoviesPopularityProps> = ({
  moviesPopularity,
}) => {
  const [slider, setSlider] = useState<Slider | null>(null);
  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  return (
    <>
    <Box paddingTop={6}>
      <Box
        position={"relative"}
        height={"600px"}
        width={"full"}
        overflow={"hidden"}
        borderRadius={20}
      >
        {/* CSS files for react-slick */}
        <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        </Head>
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>

        <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
          {moviesPopularity?.map((item, index) => (
            <Box
              key={index}
              height={"5xl"}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              paddingTop={4}
              
              
                            
            >
              <Container size="container.lg" height="600px" position="relative">
                <Stack
                  spacing={3}
                  w={"full"}
                  maxW={"lg"}
                  position="absolute"
                  top="05%"
                  transform="translate(0, -50%)"
                  padding={10}
                >
                  <h2 style={{ color: 'white'}}>{item.original_title}</h2>
                  {/* <Text>Descripcion: {item.overview}</Text>
                  <Text>Voto promedio: {item.vote_average}</Text>
                  <Text>Fecha de lanzamiento: {item.release_date}</Text> */}
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>

    </Box>
    </>
  );
};
