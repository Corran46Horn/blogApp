'use strict';

const { active } = require('browser-sync');

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);

}
  


// funkcja generateTitleLinks

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      
    /* create HTML of the link */

    /* insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
}

generateTitleLinks();

function generateTags(){
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for( let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const taglinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      console.log(taglinkHTML);
      /* add generated code to html variable */
      html = html + taglinkHTML;
      console.log(html);
      /* END LOOP: for each tag */
    } 
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  }

  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag: ', tag);
  /* find all tag links with class active */
  const activeTagLinks = href.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTagLink in activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equalTags = href.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for( let equalTag in equalTags){
    /* add class active */
    equalTag.classList.add('active');
  }

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linkForTag = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link in linkForTag){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  let authors = { };

  const articles = document.querySelectorAll(optArticleAuthorSelector);
  console.log(articles);

  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    let html = '';

    
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    const authorlinkHTML = '<li><a href="#' + authorWrapper + '"><span>' + articleAuthor + '</span></a></li>';

    html = html + authorlinkHTML;
    console.log(html);

    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  console.log(clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#author-', '');
  console.log(author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

  for(let activeAuthorLink in activeAuthorLinks){
    
    activeAuthorLink.classList.remove('active');
    
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);


  for(let authorLink of authorLinks){

    authorLink.classList.add('active');
    console.log(authorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let authorLink in authorsLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();