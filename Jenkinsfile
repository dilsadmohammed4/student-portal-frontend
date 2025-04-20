pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dilsadmohammed4/student-portal-frontend"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GIT_REPO = "https://github.com/dilsadmohammed4/student-portal-frontend.git"
        BRANCH = "master"
        KUBECONFIG = 'C:/Users/dilsa/.kube/config' // Full path (e.g., C:\Users\dilsa\.kube\config or /home/jenkins/.kube/config)
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

        stage('Build Vite App') {
            steps {
                // Build React application
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
             when {
                 expression { return false } // Always skips the stage
             }
             steps {
                 sh 'echo "Skipping tests..."'
             }
         }


        stage('Build Docker Image') {
            steps {
                // Build Docker image
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
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
                script {
                    // Replace the image tag in deployment file
                    sh """
                        sed -i 's|image: dilsadmohammed4/student-portal-frontend:.*|image: dilsadmohammed4/student-portal-frontend:${DOCKER_TAG}|' k8s/deployment.yaml
                        kubectl apply -f k8s/deployment.yaml
                        kubectl apply -f k8s/service.yaml
                        kubectl rollout status deployment/student-portal-frontend
                    """
                }
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
