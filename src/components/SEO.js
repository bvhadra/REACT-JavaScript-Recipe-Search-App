// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../components/images/Recipe_Finder_App_Logo.png';

const SEO = ({ title, description, keywords }) => {
  const defaultTitle = "Recipe Finder - Quick and Healthy Meals for Busy Developers";
  const defaultDescription = "Find quick, healthy recipes tailored for busy web developers and software engineers.";
  const defaultKeywords = "recipe finder, healthy meals, quick recipes, developer nutrition";
  const siteUrl = "https://react-javascript-recipe-search.netlify.app/";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={`${siteUrl}${logo}`} />
    </Helmet>
  );
};

export default SEO;