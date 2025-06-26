package main

import (
	"fmt"
	"log"
	"go-backend/internal/handlers" 
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// CORS Middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Define routes and link to handlers
	router.POST("/users", handlers.CreateUser)
	router.GET("/users", handlers.GetUsers)

	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	log.Fatal(router.Run(port))
}