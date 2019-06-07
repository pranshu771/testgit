

var start = 0;
var responseArray;
var spinnerClone = document.getElementById('spinner').cloneNode(true);
document.getElementById('spinner').remove();
$('.dropdown-trigger').dropdown({coverTrigger: false,inDuration:400});
$('.modal').modal({inDuration: 100});
function getMovieData() {
  return new Promise((resolve,reject) => {
    showSpinner();
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=859d20db35af8be4b688c6305b8ddadb&release_date=2019')
    .then(response => {
      return response.json()
        .then(result => {
          resolve(result.results);
          
        })
    })
  })

}
appendPosts(0);
function appendPosts(start) {
  getMovieData()
    .then(val =>{
      hideSpinner();
      for(var i = start;i<=start + 4 && i< val.length;i++) {
        var post = document.querySelector('.post').cloneNode(true);
        post.style.display = 'block';
        var poster = post.querySelector('img');
        lazyLoad(poster,val[i].backdrop_path)
        var row = document.querySelectorAll('.row')[1];
        row.appendChild(post);
        if(i == start + 4 || i == val.length - 1) {
          observeLastAndAppend(document.querySelectorAll('.card-image')[start+5],start + 5);
        }  
      }
    })
}
function clickImage() {
  var moviePoster = document.querySelectorAll('.card-content');
  Array.from(moviePoster).forEach(v => v.addEventListener('click', function() {
  }));
}

//if last post intersects with viewport call appendMore posts
function observeLastAndAppend(el,start) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };
  
  var callback = function(entries,observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        appendPosts(start);
        observer.unobserve(el)
      }
      
    })
  };
  var observer = new IntersectionObserver(callback,options);
  observer.observe(el);
  
}
//implements lazyload
function lazyLoad(el,URL) {
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };
  var callback = function(entries,observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        el.setAttribute('src','https://image.tmdb.org/t/p/original' + URL)
        observer.unobserve(el)
      }
      
    })
  };
  var observer = new IntersectionObserver(callback,options);
  observer.observe(el);
}
function showSpinner() {
  spinnerClone.style.display = 'block';
  document.body.appendChild(spinnerClone)
}
function hideSpinner() {
  spinnerClone.style.display = 'none';
  spinnerClone.remove();
  
}




