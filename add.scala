def add(list: List[Int]): Int = {
  if (list.isEmpty) 0 
  else list.head + add(list.tail)
}

val x = List(1,2,3)

println(add(x))