pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dilsadmohammed4/student-portal-ui"
        DOCKER_TAG = "1.0.0"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO = "https://github.com/dilsadmohammed4/student-portal-ui.git"
        BRANCH = "master"
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                git branch: "${BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                // Using `ci` is faster and consistent with package-lock.json
                sh 'npm ci'
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Build Vite App') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage('Run Tests') {
                    steps {
                        sh 'npm test -- --watchAll=false --passWithNoTests'
                    }
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f student-portal-ui || true

                    docker run -d --name student-portal-ui \
                        -p 3000:3000 \
                        -e REACT_APP_API_URL=http://localhost:9000 \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout'
            cleanWs()
        }

        success {
            echo '✅ Vite app deployed successfully!'
        }

        failure {
            echo '❌ Deployment failed. Please check the logs.'
        }
    }
}
