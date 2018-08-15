import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
//form event listener
searchForm.addEventListener('submit', e =>{
  //get search term
  const searchTerm = searchInput.value
  //get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //get Limit
  const searchLimit = document.getElementById('limit').value;

  //check input
  if(searchTerm ===''){
    //show message
    showMessage('please add a search term', 'alert-danger');
  }
  //clear input
  searchInput.value = '';

  //search reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    let output = '<div class="card-columns">';
    //loop though posts
    results.forEach(post => {
      // check for image
      const image = post.preview ? post.preview.images[0].source.url :
      'https://cdn.vox-cdn.com/thumbor/FXJtC7HR05_Eweus_7SQVdTleOk=/0x0:640x427/1200x800/filters:focal(269x163:371x265)/cdn.vox-cdn.com/uploads/chorus_image/image/59028817/reddit_logo_640.0.jpg';

      output += `
      <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
          <hr>
          <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
          <span class="badge badge-dark">Score: ${post.score}</span>
        </div>
      </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });
  e.preventDefault()
});

//show message
function showMessage(message, className){
  //create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const searchContainer = document.getElementById('search-container');
  //get search
  const search = document.getElementById('search');
  //insert message
  searchContainer.insertBefore(div, search);

  //timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

//truncate text
function truncateText(text, limit){
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}
