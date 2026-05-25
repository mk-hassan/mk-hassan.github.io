---
tags:
  - Rust
  - traits
type: permanent
date: 08-01-2026
time: 00:14
parent:
childs:
aliases:
folgezettel:
reference:
---
**Orphan rules**
You can't implement traits you don't created for a type you don't created
**`you must own one of them`**, for example you can't implement Debug trait for Vec yourself, you neither own `Debug` nor `Vec` they are from the std lib. same for external crates also

 But you can implement trait X you defined on `Vec` which is a huge plus, you extends the functionality of a specific type (***AWSOME***). You can also implement Debug for a type T you defined or you can implement trait X on type T you defined both of them.