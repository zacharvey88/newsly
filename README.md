# NEWSLY

View the initial plan for this project [here](https://excalidraw.com/#json=2Gr-S-XAVfyVtgPTiueBI,L6_VPlZIrK2ib7n-pBW_fw)


Welcome to the Newsly, a web application built using React with Vite, communicating with a Node.js backend hosted on Render. This project is part of my software development bootcamp with Northcoders and builds on the backend which I previously built. You can view that repositry [here](https://github.com/zacharvey88/nc-news).

## Functionality
The Newsly provides a number of features that enable users to browse, read, and engage with news articles.

### User Authentication
The app includes basic user login functionality which stores the user locally for streamlined browsing sessions. This allows for article commenting, with each comment being related with a user.

### Navigation
The Newsly makes it easy for users to browse a wide range of articles on various topics. The app's interface is designed to be intuitive and easy to navigate, making it simple for users to discover new articles based on their interests.

### Articles
Each article on the Newsly is presented in a clear and organised manner, providing users with a pleasant reading experience. Users can view detailed information about each article, including the content, author, publication date and number of likes.

### Comments
The current commenting system allows users to engage in discussion with other users but commenting on an article. Users must be logged in in order to post a comment. They are also able to delete and edit their own comments.

### Likes
Users can like an article by simply clicking the heart icon when viewing an article. Clicking the icon again will unlike it. The like state is stored locally so the user always has the correct feedback on how they have engaged with the article and to ensure accuracy of likes.

### Sorting
Articles can be sorted by date, likes or comments and furthermore, descending or ascending. Each time a different sorting option is chosen, the database is re-queried with the selected parameters to ensure the most up to date data is served.

## Try it yourself
To use the Newsly, simply visit the deployed site on [Netlify](https://zacharvey-newsly.netlify.app/). **Please note that the service spins down with inactvity so when initially visiting the site, it can take some time to get a response from the API.** From there, you can log into an existing account, browse articles, read content, and engage with other users through comments.


If you have any questions or feedback, please don't hesitate to reach out to me at [projects@zacharvey.com].

