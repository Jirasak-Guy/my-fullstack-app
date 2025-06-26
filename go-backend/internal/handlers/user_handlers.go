package handlers

import (
	"net/http"
	"go-backend/internal/models"
	"github.com/gin-gonic/gin"
)

// CreateUser
func CreateUser(c *gin.Context) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.AddUser(newUser)

	c.JSON(http.StatusCreated, gin.H{"message": "User added successfully", "user": newUser})
}

// GetUsers
func GetUsers(c *gin.Context) {
	c.JSON(http.StatusOK, models.GetUsersSlice())
}