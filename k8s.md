1, Install the Minikube for M1 chip

`curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64
sudo install minikube-darwin-arm64 /usr/local/bin/minikube`

2, Specifies the driver as Docker and enables the log to see the detailed log output

`minikube start --driver=docker --alsologtostderr`

3, Use docker as driver (can also use virtualbox) 

`minikube start --driver=docker`

4, check status `minikube status`

# 5, see pods `minikube dashboard`

6, create a repository in dockerhub

7, link it to the tagged image `kubectl create deployment first-app --image=lime5005/kub-first-app`

8, check the deployment `kubectl get deployments`

