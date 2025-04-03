let users = [];
let posts = [];
const contentElement = document.getElementById("content");

async function loadData() {
  const userResponse = await fetch("data/users.json"); //dont need to create variable, just for clarification
  const userJSON = await userResponse.json();
  users = userJSON.users; //separate content from your actual logic code
  //console.log(userJSON);

  const postResponse = await fetch("data/posts.json");
  const postJSON = await postResponse.json();
  posts = postJSON.posts;
  //console.log(postJSON);

  renderContent();
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createPostElement(post, user) {
  const postElement = document.createElement("article");
  postElement.classList.add("post");

  const headerElement = document.createElement("div");
  headerElement.classList.add("padding", "header");
  postElement.appendChild(headerElement);

  const profileImage = document.createElement("img");
  profileImage.classList.add("profile-image");
  profileImage.src = user.profile_image;
  headerElement.appendChild(profileImage);

  const userNameElement = document.createElement("h4");
  userNameElement.classList.add("padding");
  userNameElement.innerText = user.name;
  headerElement.appendChild(userNameElement);

  const imageElement = document.createElement("img");
  imageElement.src = post.image;
  postElement.appendChild(imageElement);

  const infoElement = document.createElement("div");
  infoElement.classList.add("padding");
  postElement.appendChild(infoElement);

  const likeButtonElement = document.createElement("button");
  likeButtonElement.innerText = post.liked_by_user ? "❤️" : "🤍"; //if statement in one line
  likeButtonElement.classList.add("margin-right", "like-button");
  likeButtonElement.addEventListener("click", () => {
    post.liked_by_user ? (post.likes -= 1) : (post.likes += 1);
    post.liked_by_user = !post.liked_by_user; //when clicked make the bool opposite
    // renderContent();

    // const updatedPost = createPostElement(post, user);
    // postElement.parentNode.insertBefore(updatedPost, postElement);
    // postElement.remove();

    likeButtonElement.innerText = post.liked_by_user ? "❤️" : "🤍";
    textElement.innerText = `${post.likes} likes`;
  });
  infoElement.appendChild(likeButtonElement);

  const textElement = document.createElement("span");
  textElement.innerText = `${post.likes} likes`; // It's used to reference a variable within string (opt + \ = `)
  infoElement.appendChild(textElement);

  return postElement;
}

function renderContent() {
  contentElement.innerHTML = ""; //empty everything

  for (let post of posts) {
    const user = getUserById(post.user_id); //we can stick to lowerCamelCase but it common when json comer from servetr that its written differently
    const postElement = createPostElement(post, user);
    contentElement.appendChild(postElement);
  }
}

loadData();
