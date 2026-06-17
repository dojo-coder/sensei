package main

import "testing"

func TestHelloWorld(t *testing.T) {
	t.Run("It should return 'Hello World!'", func(t *testing.T) {
		result := HelloWorld()
		if result != "Hello World!" {
			t.Errorf("Expected 'Hello World!' but got '%s'", result)
		}
	})
}
