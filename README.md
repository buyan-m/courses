# [Okul.one](https://okul.one)
Free educational platform for teachers and students. The backend for this project stays in [this repo](https://github.com/buyan-m/courses-backend)

The project is based on Vue 3, Pinia, Vue CLI, and Editorjs. 
## How to start
To get started with the project, follow these steps
- Run `npm сi` to install the necessary dependencies.
- If you don't want to set up your own backend, you can modify the devServer configuration in the vue.config.js file. If you only want to take a look at the project, you can use the production API.
- You can also remove HTTPS part to avoid creating a certificate.
- Run `npm run dev` to start the development server.

If you want to have the full experience, you can use Docker Compose.

## Technical details
The project has two major parts: the Editor module for creating courses and the Viewer module for taking courses.

The project is implemented as a typical Vue project with some specific features:
- At the root of the `src` directory, you will find only the common parts of the project. The bulk of the code resides in the `Basic`, `Editor`, and `Viewer` modules. These modules are designed to be isolated and should not interact with each other. As a result, each module can be entirely rewritten without affecting its siblings. Each module has its own routing, pages, and components. Overall, the folder structure of these modules is similar to a typical Vue app, although some directories have been omitted or added to match the specific purposes of each module.
- There is no shared store that is used by many components. As the business logic becomes more complex, store modules should be created and placed near the corresponding widget or page. For example, `src/Editor/views/Courses/CourseUpdate.store.ts`. In many cases, the Single-File Component (SFC) itself contains client-server logic and state management. This design reduces the difficulty of code maintenance and avoids the need to write unified code for all components, thus reducing the likelihood of creating redundant code. When project-wide entities are created, there is no restriction on creating shared store modules.

One more detail about editor: some of the tools used in EditorJS are more complex than others, and therefore, they require a child Vue component to be connected to the EditorJS app using the createApp method. These components serve as micro-apps since, inside EditorJS, we do not have direct access to the main Vue app. By using these child components, we are able to implement more complex logic without compromising the performance of the tools. The components are able to communicate with EditorJS and the main Vue app, sending and receiving content through events.
