import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb separator=">">
      <BreadcrumbItem>
        <BreadcrumbLink position={'relative'} left={36} top={-460} as={Link} to="/">
          Inicio
        </BreadcrumbLink>
      </BreadcrumbItem>
      {paths.map((path, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink as={Link} to={`/${paths.slice(0, index + 1).join('/')}`}>
            {path}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
