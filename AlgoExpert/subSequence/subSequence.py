def isValidSubsequence(array, sequence):
    # Write your code here.
	seqIdx = 0
	for entry in array:
		if seqIdx == len(sequence):
			break
		if sequence[seqIdx] == entry:
			seqIdx +=1
	return seqIdx == len(sequence)
# Once it breaks in line 6, it will go to the last line to return True.
# array = [5, 1, 22, -1]
# seq = [5, 22]
# seq[0] = 5, 5 = array[0]? yes, so seqIdx = 0+1=1, 1 == len(seq) == 2? no, so continue, seq[1] == array[1]? no, continue, seq[1] == array[2]?  yes, so seqIdx = 1+1=2, 2 == len(seq)==2? yes, so break, return True
