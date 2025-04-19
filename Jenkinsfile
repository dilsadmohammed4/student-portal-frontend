pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dilsadmohammed4/student-portal-frontend"
        DOCKER_TAG = "1.0.0"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO = "https://github.com/dilsadmohammed4/student-portal-frontend.git"
        BRANCH = "master"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clean workspace and checkout code
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

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Login to DockerHub') {
            steps {
                // Login to DockerHub
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push to DockerHub') {
            steps {
                // Push Docker image to DockerHub
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                // Stop existing container if running
                sh '''
                    if docker ps -a | grep -q student-portal-frontend; then
                        docker stop student-portal-frontend
                        docker rm student-portal-frontend
                    fi
                '''

                // Run new container
                sh '''
                    docker run -d \
                        --name student-portal-frontend \
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
