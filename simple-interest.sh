#!/bin/bash

echo "Enter Principal:"
read p

echo "Enter Rate of Interest:"
read r

echo "Enter Time:"
read t

si=$((p * r * t / 100))

echo "Simple Interest is: $si"
