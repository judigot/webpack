// Environmental variables out of the box
// localhost:8080/env-vars.html
// sh means "shell script"

//=====PLUGINS=====//
// Credentials
// Credentials Binding
//=====PLUGINS=====//

// Custom environmental variable
// CODE_CHANGES = getGitChanges

pipeline {
    agent any

    // Environment variables are accessible in the stages
    environment {
        NEW_VERSION = '1.0'

        // "Credentials Binding" plugin allows you to use Jenkins credentials in Jenkinsfile
        SERVER_CREDENTIALS = credentials('judigot') // Finds the credentials that are available in Jenkins
    }
    stages {
        stage("setup") {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
                sh 'export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
                sh 'nvm install 17.7.0'
            }
        }
        stage("build") {
            // when {
            //     expression {
            //     // Build only if there are changes in the code
            //         BRANCH_NAME == 'main' && CODE_CHANGES == true
            //     }
            // }
            steps {
                // Actual build scripts

                echo "Building version ${NEW_VERSION}.."
                // echo 'Building version ${NEW_VERSION}..'
                

                //=====NODE.JS=====//
                sh 'npm install'
                sh 'npm build'
                sh 'npm start dist/index.js'
                //=====NODE.JS=====//
            }
        }

        stage("test") {
            // when {
            //     expression {
            //         // Test only in dev branch
            //         BRANCH_NAME == 'main' || BRANCH_NAME == 'main'
            //     }
            // }
            steps {
                // Actual test scripts
                echo 'Testing..'
                
            }
        }

        stage("deploy") {
            steps {
                // Actual deploy scripts
                echo 'Deploying..'

            }
        }
    }

    // Executes after all the stages are executed
    post {

        // This script always executes whether the build was successful or not
        // Examples (send email to the dev team about the build condition/result)
        // always {

        // }

        success {
            echo 'Success! -judigot'
        }

        // failure {

        // }
    }
}
