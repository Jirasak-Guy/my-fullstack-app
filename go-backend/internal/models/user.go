package models

import "sync"

// User struct 
type User struct {
	Name string `json:"name"`
}

// Global slice 
var (
	users = make([]User, 0)
	mu    sync.Mutex
)

// GetUsersSlice returns a copy of the users slice
func GetUsersSlice() []User {
	mu.Lock()
	defer mu.Unlock()
	return users
}

// AddUser adds a new user to the slice
func AddUser(newUser User) {
	mu.Lock()
	defer mu.Unlock()
	users = append(users, newUser)
}